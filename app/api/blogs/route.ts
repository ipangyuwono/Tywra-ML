import { supabase } from '@/lib/supabase';

export async function GET() {
    const { data, error } = await supabase
        .from('try-api')
        .select('*');

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { nama, alamat, latitude, longitude } = body;

        // Validation
        if (!nama || !alamat || !latitude || !longitude) {
            return new Response(
                JSON.stringify({ error: "Missing required fields: nama, alamat, latitude, longitude" }), 
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }

        // Generate ID (simple counter based on existing data)
        const { data: existingData } = await supabase
            .from('try-api')
            .select('id')
            .order('id', { ascending: false })
            .limit(1);

        const nextId = existingData && existingData.length > 0 
            ? (parseInt(existingData[0].id) + 1).toString() 
            : '1';

        // Insert into database
        const { data, error } = await supabase
            .from('try-api')
            .insert([{ 
                id: nextId,
                nama, 
                alamat, 
                latitude: parseFloat(latitude), 
                longitude: parseFloat(longitude) 
            }])
            .select();

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify({ 
            message: "Data created successfully", 
            data: data[0] 
        }), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });

    } catch {
        return new Response(JSON.stringify({ 
            error: "Invalid request body" 
        }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
}