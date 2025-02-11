import { Request, Response } from 'express';
import { supabase } from '../db'; // Tuo Supabase Client

export const getStats = async (req: Request, res: Response) => {
  try {
    // Hae kaikki muistiinpanot
    const { data: notes, error: notesError } = await supabase
      .from('notes')
      .select('*')
      .eq('isDeleted', false);

    if (notesError) {
      return res.status(500).json({ error: notesError.message });
    }

    // Laske muistiinpanojen kokonaismäärä
    const totalNotes = notes.length;

    // Laske värien jakauma
    const colorStats: Record<string, number> = notes.reduce((acc, note) => {
      const color = note.color || '#1976d2'; // Oletusväri, jos väriä ei ole määritelty
      acc[color] = (acc[color] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Muotoile väritilastot
    const formattedColorStats = Object.keys(colorStats).map(color => ({
      color,
      colorCount: colorStats[color],
    }));

    // Laske muistiinpanojen määrä viimeisen 7 päivän aikana
    const notesLast7Days: Record<string, number> = notes.reduce((acc, note) => {
      const noteDate = new Date(note.timestamp).toISOString().split('T')[0];
      const today = new Date();
      const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0];

      if (noteDate >= sevenDaysAgo) {
        acc[noteDate] = (acc[noteDate] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const formattedNotesLast7Days = Object.keys(notesLast7Days).map(date => ({
      date,
      count: notesLast7Days[date],
    }));

    // Hae viimeisimmät muistiinpanot
    const latestNotes = notes
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5) // Ota viimeisimmät 5 muistiinpanoa
      .map(note => ({ title: note.title, timestamp: note.timestamp }));

    // Laske lihavoidut, kursivoidut ja alleviivatut muistiinpanot
    const boldNotesCount = notes.filter(note => note.isBold).length;
    const italicNotesCount = notes.filter(note => note.isItalic).length;
    const underlinedNotesCount = notes.filter(note => note.isUnderline).length;

    // Laske suosituimmat värit
    const topColors = Object.entries(colorStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([color, count]: [string, number]) => ({ color, count }));

    // Laske muistiinpanojen määrä käyttäjäkohtaisesti
    const notesPerUser: Record<string, number> = notes.reduce((acc, note) => {
      const username = note.user_id; // Oletetaan, että user_id on käyttäjän nimi
      acc[username] = (acc[username] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const formattedNotesPerUser = Object.keys(notesPerUser).map(username => ({
      username,
      count: notesPerUser[username],
    }));

    res.json({
      totalNotes,
      colorStats: formattedColorStats,
      notesLast7Days: formattedNotesLast7Days,
      latestNotes,
      boldNotesCount,
      italicNotesCount,
      underlinedNotesCount,
      topColors,
      notesPerUser: formattedNotesPerUser,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};