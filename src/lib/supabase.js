import { supabase } from "./supabase_client.js";

async function test() {
  const { data, error } = await supabase.from('groups').select('*').limit(2);
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}

test();
