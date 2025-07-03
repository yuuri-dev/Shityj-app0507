import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  'https://rtxggrnxszgkqpgpetai.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0eGdncm54c3pna3FwZ3BldGFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MDg4MjQsImV4cCI6MjA2NTk4NDgyNH0.HPVkfPyPieppy9TX-rlm_Eys9rObfUxESZRwbENBbJo'
);
