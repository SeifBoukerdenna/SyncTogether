import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cgwyjwakvnicwjhlmnei.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnd3lqd2Frdm5pY3dqaGxtbmVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY3NDM4OTcsImV4cCI6MjAzMjMxOTg5N30.gHykTlYdvFqmf4jGlk0RbdozjDDMKYzQK-NjvTD8DkE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

