import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';

const SUPABASE_URL = 'https://auquyjigjceqzwpjbbff.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1cXV5amlnamNlcXp3cGpiYmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MzAwNzksImV4cCI6MjA4MDAwNjA3OX0.aiFHuOp6CgyjN3VL8OQZp7U2bGLxZu9-OFlCGwkqq3w';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});