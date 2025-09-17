import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://szrynuiuxpffgvzbghxo.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6cnludWl1eHBmZmd2emJnaHhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNzMyMzMsImV4cCI6MjA3MzY0OTIzM30.7IdYgYqA4hu7jBL1X0s2JrEBrrGV4pPJj1g7cZ5HgVg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
