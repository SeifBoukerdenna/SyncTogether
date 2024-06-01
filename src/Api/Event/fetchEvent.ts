import { supabase } from "lib/supabase";

const fetchEventFromSupabase = async (id: string) => {
    const { data, error } = await supabase.from('Event').select('*').eq('id', id).single();
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export default fetchEventFromSupabase