INSERT INTO materia (id, name, image_url) VALUES 
(1, 'Spring Boot', 'https://placehold.co/600x400?text=Spring+Boot'),
(2, 'React', 'https://placehold.co/600x400?text=React'),
(3, 'Agile', 'https://placehold.co/600x400?text=Agile'),
(4, 'Sistemi', 'https://placehold.co/600x400?text=Sistemi'),
(5, 'Rete', 'https://placehold.co/600x400?text=Rete');



INSERT INTO `quiz`.`quiz`
(`id`, `id_option_correct`, `difficulty`, `help`, `text`, `materia_id`)
VALUES
(1, 1, 1, 'Pensa a una capitale europea.', 'Qual è la capitale della Francia?', 1),  -- Difficoltà 1 (EASY)
(2, 2, 2, 'Ricorda che l\'acqua è composta da idrogeno e ossigeno.', 'Qual è la formula chimica dell\'acqua?', 2),  -- Difficoltà 2 (MEDIUM)
(3, 3, 3, 'Considera i grandi scrittori del Rinascimento.', 'Chi ha scritto "Il Principe"?', 3);  -- Difficoltà 3 (HARD)


INSERT INTO `quiz`.`opzione` (`quiz_id`, `text`) VALUES
(1, 'Parigi'),         -- Opzione per il quiz 1
(1, 'Londra'),         -- Opzione per il quiz 1
(1, 'Berlino'),        -- Opzione per il quiz 1
(2, 'H2O'),            -- Opzione per il quiz 2
(2, 'CO2'),            -- Opzione per il quiz 2
(2, 'O2'),             -- Opzione per il quiz 2
(3, 'Machiavelli'),    -- Opzione per il quiz 3
(3, 'Dante'),          -- Opzione per il quiz 3
(3, 'Petrarca');       -- Opzione per il quiz 3



# Queta materia
INSERT INTO materia (id, name, image_url) VALUES 
(1, 'Spring Boot', 'https://placehold.co/600x400?text=Spring+Boot'),

# Quiz

INSERT INTO `quiz`.`quiz`
(`id`, `id_option_correct`, `difficulty`, `help`, `text`, `materia_id`)
VALUES
(1, 1, 1, 'Pensa a una capitale europea.', 'Qual è la capitale della Francia?', 1),  -- Difficoltà 1 (EASY)
INSERT INTO `quiz`.`opzione` (`id`, `quiz_id`, `text`) VALUES
(1,1, 'Parigi'),         -- Opzione per il quiz 1
(2, 1, 'Londra'),         -- Opzione per il quiz 1