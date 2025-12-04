-- Create table try-api in Supabase
CREATE TABLE "try-api" (
  id TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  alamat TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insert sample data
INSERT INTO "try-api" (id, nama, alamat, latitude, longitude) VALUES
('1', 'Alun-Alun Brebes', 'Kauman, Brebes, Kec. Brebes, Kabupaten Brebes, Jawa Tengah 52212, Indonesia', -6.8833333, 109.05),
('2', 'Alun-Alun Semarang', 'Jl. Kyai H. Agus Salim No.1, Old Town, Kauman, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50139, Indonesia', -6.9833333, 110.4166667),
('3', 'Alun-Alun Bandung', 'Jl. Asia Afrika No.60, Braga, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40111, Indonesia', -6.917464, 107.619123);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE "try-api" ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access to all users
CREATE POLICY "Allow public read access" ON "try-api"
  FOR SELECT
  TO public
  USING (true);
