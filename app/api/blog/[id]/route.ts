import { supabase } from '@/lib/supabase';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    
    const { data, error } = await supabase
        .from('try-api')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        return new Response(JSON.stringify({ error: "Blog not found!" }), {
            status: 404,
            headers: { "Content-Type": "application/json" }
        });
    }

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}