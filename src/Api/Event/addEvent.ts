import { supabase } from "supabase";

// Function to add an event to Supabase
const addEventToSupabase = async (eventData: {
    title: string;
    description: string;
    date: string;
    hour: string;
}) => {
    const { data, error } = await supabase
        .from('Event')
        .insert([eventData]);

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export default addEventToSupabase