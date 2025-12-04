export interface Blog {
  id: string;
  nama: string;
  alamat: string;
  latitude: number;
  longitude: number;
}

export const blogs: Blog[] = [
  {
    id: "1",
    nama: "Alun-Alun Brebes",
    alamat: "Kauman, Brebes, Kec. Brebes, Kabupaten Brebes, Jawa Tengah 52212, Indonesia",
    latitude: -6.8833333,
    longitude: 109.05,
  },
  {
    id: "2",
    nama: "Alun-Alun Semarang",
    alamat: "Jl. Kyai H. Agus Salim No.1, Old Town, Kauman, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50139, Indonesia",
    latitude: -6.9833333,
    longitude: 110.4166667,
  },
  {
    id: "3",
    nama: "Alun-Alun Bandung",
    alamat: "Jl. Asia Afrika No.60, Braga, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40111, Indonesia",
    latitude: -6.917464,
    longitude: 107.619123,
  }
];