import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import SessionWrapper from "@/components/SessionWrapper";
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  colors: {
    primary: ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1'],
    secondary: ['#F8F9FA', '#E9ECEF', '#DEE2E6', '#CED4DA', '#ADB5BD', '#6C757D', '#495057', '#343A40', '#212529', '#121212'],
    tertiary: ['#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20'],
  },
  primaryColor: 'primary',
  defaultGradient: {
    from: '#007BFF',
    to: '#28A745',
    deg: 45,
  },
});

export const metadata: Metadata = {
  title: "Ruang Kita",
  description: "Aplikasi peminjaman ruang untuk perpustakaan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <MantineProvider theme={theme} defaultColorScheme="light">
            <Notifications position="top-right" />
            {children}
          </MantineProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
