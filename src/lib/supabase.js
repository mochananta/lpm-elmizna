import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://htlycalkyrhdxluekxxr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bHljYWxreXJoZHhsdWVreHhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0OTMzMjAsImV4cCI6MjA3ODA2OTMyMH0.21TA-fs_wcwJqu7qOj0e-O4o4sdrUdcaQCLmusvTx64";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
