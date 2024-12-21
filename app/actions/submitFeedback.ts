'use server'

import { supabase } from '@/utils/supabase'

export async function submitFeedback(formData: FormData) {
  const student_number = formData.get('student_number') as string
  const name = formData.get('name') as string
  const feedback = formData.get('feedback') as string

  if (!student_number || !name || !feedback) {
    return { error: 'All fields are required' }
  }

  try {
    const { data, error } = await supabase
      .from('feedback')
      .insert([
        { student_number, name, feedback }
      ])
      .select()

    if (error) {
      console.error('Feedback submission error:', error)
      return { error: 'Failed to submit feedback' }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Unexpected error:', err)
    return { error: 'An unexpected error occurred while submitting feedback' }
  }
}

