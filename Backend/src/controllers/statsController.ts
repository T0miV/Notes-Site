import { Request, Response } from 'express';
import { supabase } from '../db'; //Bring supabase client

export const getStats = async (req: Request, res: Response) => {
  try {
    //Get all notes
    const { data: notes, error: notesError } = await supabase
      .from('notes')
      .select('*')
      .eq('isDeleted', false);

    if (notesError) {
      return res.status(500).json({ error: notesError.message });
    }

    //Count total notes
    const totalNotes = notes.length;

    //Count notes by color
    const colorStats: Record<string, number> = notes.reduce((acc, note) => {
      const color = note.color || '#1976d2'; // Oletusväri, jos väriä ei ole määritelty
      acc[color] = (acc[color] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    //Customize color stats
    const formattedColorStats = Object.keys(colorStats).map(color => ({
      color,
      colorCount: colorStats[color],
    }));

    //Count notes by last 7 days
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

    //Get latest notes
    const latestNotes = notes
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5) // Ota viimeisimmät 5 muistiinpanoa
      .map(note => ({ title: note.title, timestamp: note.timestamp }));

    //Count bold, italic and underlined notes
    const boldNotesCount = notes.filter(note => note.isBold).length;
    const italicNotesCount = notes.filter(note => note.isItalic).length;
    const underlinedNotesCount = notes.filter(note => note.isUnderline).length;

    //Count top colors
    const topColors = Object.entries(colorStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([color, count]: [string, number]) => ({ color, count }));

    //Count notes per user
    const notesPerUser: Record<string, number> = notes.reduce((acc, note) => {
      const username = note.user_id; //Let's assume user_id is the username
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