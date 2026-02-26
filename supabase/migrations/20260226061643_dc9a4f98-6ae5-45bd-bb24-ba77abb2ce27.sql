
-- Quotes table
CREATE TABLE public.quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  theme text NOT NULL DEFAULT 'all',
  text text NOT NULL,
  author text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read quotes" ON public.quotes FOR SELECT USING (true);
CREATE INDEX idx_quotes_theme ON public.quotes (theme);

-- Fun facts table
CREATE TABLE public.fun_facts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  theme text NOT NULL DEFAULT 'all',
  fact text NOT NULL,
  source text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.fun_facts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read fun_facts" ON public.fun_facts FOR SELECT USING (true);
CREATE INDEX idx_fun_facts_theme ON public.fun_facts (theme);

-- Words table
CREATE TABLE public.words (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  theme text NOT NULL DEFAULT 'all',
  word text NOT NULL,
  pronunciation text NOT NULL,
  part_of_speech text NOT NULL,
  definition text NOT NULL,
  example text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.words ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read words" ON public.words FOR SELECT USING (true);
CREATE INDEX idx_words_theme ON public.words (theme);

-- Admin insert/update/delete policies
CREATE POLICY "Admins manage quotes" ON public.quotes FOR ALL USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage fun_facts" ON public.fun_facts FOR ALL USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage words" ON public.words FOR ALL USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
