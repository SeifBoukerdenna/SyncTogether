import { EventType } from "@src/Component/Event/types";
import { supabase } from "lib/supabase";

const fetchEvents = async (): Promise<EventType[]> => {
    const { data, error } = await supabase.from('Event').select('*');
    if (error) {
        throw new Error(error.message);
    }
    return data || [];
};

export default fetchEvents