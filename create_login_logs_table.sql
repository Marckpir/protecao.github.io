-- Tabela para armazenar logs de acesso/login
-- Execute este SQL no Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.login_logs (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    login_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para melhorar performance nas consultas por data
CREATE INDEX IF NOT EXISTS idx_login_logs_timestamp 
ON public.login_logs (login_timestamp DESC);

-- Índice para consultas por email
CREATE INDEX IF NOT EXISTS idx_login_logs_email 
ON public.login_logs (email);

-- Comentários para documentação
COMMENT ON TABLE public.login_logs IS 'Registra todos os acessos/logins dos usuários no sistema';
COMMENT ON COLUMN public.login_logs.email IS 'Email do usuário que fez login';
COMMENT ON COLUMN public.login_logs.categoria IS 'Categoria do usuário (admin, tecnico, usuario)';
COMMENT ON COLUMN public.login_logs.login_timestamp IS 'Data e hora do acesso';

-- Habilitar Row Level Security (RLS) - IMPORTANTE!
ALTER TABLE public.login_logs ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT de qualquer usuário autenticado
CREATE POLICY "Permitir INSERT de logs" 
ON public.login_logs 
FOR INSERT 
WITH CHECK (true);

-- Política para permitir SELECT de qualquer usuário autenticado
CREATE POLICY "Permitir SELECT de logs" 
ON public.login_logs 
FOR SELECT 
USING (true);

-- (Opcional) Política para limpar logs antigos automaticamente após 90 dias
-- Descomentar se desejar implementar
-- CREATE POLICY "Auto-delete logs antigos" 
-- ON public.login_logs 
-- FOR DELETE 
-- USING (login_timestamp < NOW() - INTERVAL '90 days');
