<?php
/**
 * Conteúdo de demonstração do ambiente local e do protótipo estático.
 * Nomes, falas e datas são fictícios. Executado pelo blueprint do WordPress Playground.
 */

require '/wordpress/wp-load.php';

switch_theme('labho');
update_option('blogname', 'LabHO — Laboratório de História Oral');
update_option('blogdescription', 'Acervo de entrevistas do Laboratório de História Oral do Departamento de História da UFV.');
update_option('permalink_structure', '/%postname%/');
update_option('timezone_string', 'America/Sao_Paulo');

// Idempotente: não duplica conteúdo se o blueprint rodar de novo
if (get_page_by_path('laboratorio')) {
    flush_rewrite_rules();
    return;
}

function labho_seed($type, $title, array $args = [], array $meta = []) {
    $id = wp_insert_post(array_merge(['post_type' => $type, 'post_title' => $title, 'post_status' => 'publish'], $args));
    foreach ($meta as $key => $value) {
        update_post_meta($id, "_labho_$key", $value);
    }
    return $id;
}

function labho_paragraphs(array $paragraphs) {
    return implode('', array_map(function ($p) {
        return "<!-- wp:paragraph --><p>$p</p><!-- /wp:paragraph -->";
    }, $paragraphs));
}

/* Páginas */
$home = labho_seed('page', 'Vozes que *atravessam* o tempo.', [
    'post_excerpt' => 'Registramos, preservamos e devolvemos à sociedade memórias que raramente chegaram aos arquivos oficiais.',
    'post_content' => labho_paragraphs([
        'O LabHO reúne pesquisadoras, pesquisadores e estudantes do Departamento de História da UFV em torno da história oral como método de pesquisa e como compromisso público.',
        'O acervo guarda entrevistas filmadas, transcrições e fotografias cedidas pelas famílias entrevistadas.',
    ]),
]);
update_option('show_on_front', 'page');
update_option('page_on_front', $home);

labho_seed('page', 'Quem somos', [
    'post_name'    => 'laboratorio',
    'post_excerpt' => 'Um espaço de pesquisa, ensino e extensão dedicado à história oral no Departamento de História da UFV.',
    'post_content' => labho_paragraphs([
        'O Laboratório de História Oral nasceu da necessidade de registrar experiências que não aparecem nos documentos escritos.',
        'Vinculado ao Departamento de História da Universidade Federal de Viçosa, o laboratório desenvolve projetos de pesquisa, forma estudantes na metodologia da história oral e mantém um acervo aberto à consulta.',
        'Trabalhamos em parceria com comunidades, movimentos sociais e instituições da Zona da Mata mineira.',
    ]),
]);
labho_seed('page', 'Vamos *conversar*', [
    'post_name'    => 'contato',
    'post_excerpt' => 'Escreva para propor parcerias, doar acervos ou participar das atividades do laboratório.',
]);

/* Projetos do acervo */
$memorias = labho_seed('projeto', 'Memórias negras e indígenas da Zona da Mata', [
    'menu_order'   => 1,
    'post_excerpt' => 'Entrevistas de história de vida com moradoras e moradores de comunidades negras e indígenas da Zona da Mata mineira.',
    'post_content' => labho_paragraphs([
        'O projeto reúne narrativas de pessoas negras e indígenas da Zona da Mata mineira: trajetórias, saberes e formas de organização que ficaram de fora dos arquivos oficiais.',
        'As entrevistas são gravadas em vídeo, transcritas e disponibilizadas com ficha técnica e fotografias cedidas pelas famílias.',
        'Cada depoimento é devolvido à comunidade antes da publicação.',
    ]),
]);
$trajetorias = labho_seed('projeto', 'Trajetórias institucionais na UFV', [
    'menu_order'   => 2,
    'post_excerpt' => 'Depoimentos de servidoras, servidores, docentes e estudantes que construíram a história da Universidade Federal de Viçosa.',
    'post_content' => labho_paragraphs([
        'O projeto documenta a universidade a partir de quem a vive: técnicos, docentes, trabalhadores terceirizados e estudantes de diferentes gerações.',
        'O foco está nas vozes pouco presentes na memória institucional.',
    ]),
]);

/* Entrevistas (a fala em destaque alimenta a animação da página inicial) */
$entrevistas = [
    ['Ana Lúcia Ferreira', $memorias, 'Rezadeira e liderança comunitária', 'Minha avó contava que a estrada foi aberta na enxada, por gente nossa.'],
    ['Benedito Souza', $memorias, 'Capitão de congado', 'O congado era a nossa forma de lembrar quem veio antes.'],
    ['Jurema Puri', $memorias, 'Artesã e contadora de histórias', 'A gente aprendia o nome das plantas antes de aprender a ler.'],
    ['Tereza Cristina Silva', $memorias, 'Quituteira e griô', 'Ninguém escreveu a nossa história. Então a gente conta.'],
    ['Manoel do Rosário', $memorias, 'Lavrador e mestre de folia', 'Quando eu falo, falo por muita gente que não pôde.'],
    ['Rosângela Oliveira', $trajetorias, 'Primeira turma de cotistas', 'Fui a primeira da família a entrar na universidade. Minha mãe chorou no portão.'],
    ['Geraldo Pereira', $trajetorias, 'Servidor da biblioteca central', 'Trabalhei quarenta anos no campus. Vi cada prédio subir.'],
];
foreach ($entrevistas as $i => list($nome, $projeto, $resumo, $fala)) {
    $primeiro = strtok($nome, ' ');
    labho_seed('entrevista', $nome, [
        'post_excerpt' => $resumo,
        'post_content' => labho_paragraphs([
            "$primeiro nasceu na Zona da Mata mineira e passou a vida entre o trabalho e a comunidade. Na entrevista, lembra a infância, a família e as redes de apoio que sustentaram gerações.",
            'O depoimento percorre temas como trabalho, religiosidade e educação, e ajuda a entender as mudanças da região ao longo do século XX.',
        ]),
    ], [
        'projeto'  => $projeto,
        'destaque' => $fala,
        'youtube'  => 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
        'pdf'      => '',
        'ficha'    => "Entrevistador(a): Equipe LabHO\nData: " . sprintf('%02d/%02d/2024', 10 + $i, 3 + $i) . "\nLocal: Viçosa, MG\nDuração: 1h " . (20 + $i * 5) . 'min',
    ]);
}

/* Eventos */
$eventos = [
    ['Seminário Memória, Oralidade e Território', '2025-11-20', 'Auditório do DHI', 'Seminário'],
    ['Oficina de entrevista e transcrição', '2025-08-14', 'Laboratório de História Oral', 'Oficina'],
    ['Mostra Vozes da Mata', '2024-11-22', 'Cine UFV', 'Mostra audiovisual'],
    ['Roda de conversa: 13 de maio, memória e luta', '2024-05-13', 'Praça da Estação, Viçosa', 'Roda de conversa'],
];
foreach ($eventos as list($titulo, $data, $local, $tipo)) {
    labho_seed('evento', $titulo, [
        'post_excerpt' => "$tipo aberto à comunidade acadêmica e ao público externo.",
        'post_content' => labho_paragraphs([
            'Encontro com mesas de debate, exibição de trechos de entrevistas do acervo e participação de pessoas entrevistadas pelo laboratório.',
            'A atividade faz parte das ações de extensão do Laboratório de História Oral e do Departamento de História da UFV.',
        ]),
    ], [
        'data'         => $data,
        'local'        => $local,
        'video'        => 'https://youtu.be/aqz-KE-bpKQ',
        'certificados' => 'https://drive.google.com/',
    ]);
}

/* Produções */
$producoes = [
    ['Série Vozes da Mata', 'YouTube', 'Vídeos curtos com trechos das entrevistas do acervo.', 'https://www.youtube.com/'],
    ['Caderno de metodologia', 'Drive', 'Guia de entrevista, transcrição e cessão de direitos usado nas oficinas.', 'https://drive.google.com/'],
    ['Artigos e capítulos', 'Artigo', 'Produção acadêmica da equipe a partir do acervo.', 'https://drive.google.com/'],
];
foreach ($producoes as $i => list($titulo, $tipo, $texto, $url)) {
    labho_seed('producao', $titulo, ['post_excerpt' => $texto, 'menu_order' => $i], ['tipo' => $tipo, 'url' => $url]);
}

flush_rewrite_rules();
