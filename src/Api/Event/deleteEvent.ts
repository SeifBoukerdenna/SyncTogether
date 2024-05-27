import { supabase } from "supabase";

const deleteEventFromSupabase = async (id: string) => {
    const { data, error } = await supabase.from('Event').delete().match({ id });
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export default deleteEventFromSupabase