import { supabase } from "lib/supabase";

// Function to update an event in Supabase
const updateEventInSupabase = async (id: string, eventData: {
    title: string;
    description: string;
    date: string;
    hour: string;
}) => {
    const { data, error } = await supabase
        .from('Event')
        .update(eventData)
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export default updateEventInSupabase;
