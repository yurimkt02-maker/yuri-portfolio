/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config) => {
    // Evita conflitos de lock de arquivos de cache em diretórios sincronizados pelo OneDrive
    config.cache = false;
    return config;
  },
};

export default nextConfig;
