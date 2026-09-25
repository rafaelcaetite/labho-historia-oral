<?php
/**
 * Tema LabHO — Laboratório de História Oral (DHI/UFV).
 * Tudo que a equipe edita fica no painel: Entrevistas, Projetos, Eventos, Produções, Páginas e Personalizar.
 * Compatível com PHP 7.4+ e WordPress 6.0+.
 */

defined('ABSPATH') || exit;

const LABHO_VER = '1.2.0';

/* ---------- setup ---------- */
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'gallery', 'caption', 'style', 'script']);
    add_theme_support('responsive-embeds');
    add_post_type_support('page', 'excerpt');
    register_nav_menus(['principal' => 'Menu principal']);
});

add_action('widgets_init', function () {
    register_sidebar([
        'name'          => 'Rodapé — Apoio (logos)',
        'id'            => 'apoio',
        'description'   => 'Adicione um bloco "Imagem" para cada logo de apoio.',
        'before_widget' => '<div class="logo">',
        'after_widget'  => '</div>',
    ]);
});

// <head> enxuto: sem script de emojis, versão do WP e links de editores legados
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');

/* ---------- assets ---------- */
add_action('wp_enqueue_scripts', function () {
    // Newsreader ≈ Bradford LL; Inter Tight ≈ TWK Everett (fontes da referência são pagas — ver LEIA-ME)
    wp_enqueue_style('labho-fonts', 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..500;1,6..72,300..500&family=Inter+Tight:wght@400;500&display=swap', [], null);
    wp_enqueue_style('labho', get_template_directory_uri() . '/assets/css/main.css', [], LABHO_VER);
});

// conexões antecipadas com fontes e CDN
add_filter('wp_resource_hints', function ($urls, $type) {
    if ($type === 'preconnect') {
        $urls[] = 'https://fonts.googleapis.com';
        $urls[] = ['href' => 'https://fonts.gstatic.com', 'crossorigin'];
        $urls[] = ['href' => 'https://cdn.jsdelivr.net', 'crossorigin'];
    }
    return $urls;
}, 10, 2);

// descrição e Open Graph básicos (sem plugin de SEO)
add_action('wp_head', function () {
    $desc = is_singular() && has_excerpt() ? get_the_excerpt() : get_bloginfo('description');
    if (!$desc) $desc = 'Laboratório de História Oral do Departamento de História da UFV: acervo de entrevistas, projetos e eventos.';
    $img = is_singular() && has_post_thumbnail() ? get_the_post_thumbnail_url(null, 'large') : '';
    printf('<meta name="description" content="%s">' . PHP_EOL, esc_attr(wp_strip_all_tags($desc)));
    printf('<meta property="og:title" content="%s">' . PHP_EOL, esc_attr(wp_get_document_title()));
    printf('<meta property="og:description" content="%s">' . PHP_EOL, esc_attr(wp_strip_all_tags($desc)));
    printf('<meta property="og:type" content="%s">' . PHP_EOL, is_singular() && !is_front_page() ? 'article' : 'website');
    printf('<meta property="og:locale" content="pt_BR">' . PHP_EOL);
    if ($img) printf('<meta property="og:image" content="%s">' . PHP_EOL, esc_url($img));
}, 2);

// importmap + módulo principal (impresso à mão para funcionar em qualquer versão do WP)
add_action('wp_head', function () {
    echo '<script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js","lenis":"https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.mjs"}}</script>' . "\n";
}, 1);
add_action('wp_footer', function () {
    printf('<script type="module" src="%s"></script>' . "\n", esc_url(get_template_directory_uri() . '/assets/js/app.js?v=' . LABHO_VER));
}, 20);

/* ---------- tipos de conteúdo ---------- */
add_action('init', function () {
    $base = ['public' => true, 'show_in_rest' => true, 'menu_position' => 5];

    register_post_type('projeto', $base + [
        'labels'      => labho_labels('Projeto', 'Projetos', false),
        'menu_icon'   => 'dashicons-portfolio',
        'has_archive' => 'acervo',
        'rewrite'     => ['slug' => 'acervo', 'with_front' => false],
        'supports'    => ['title', 'editor', 'excerpt', 'thumbnail', 'page-attributes'],
    ]);
    register_post_type('entrevista', $base + [
        'labels'    => labho_labels('Entrevista', 'Entrevistas', true),
        'menu_icon' => 'dashicons-microphone',
        'rewrite'   => ['slug' => 'entrevista', 'with_front' => false],
        'supports'  => ['title', 'editor', 'excerpt', 'thumbnail'],
    ]);
    register_post_type('evento', $base + [
        'labels'      => labho_labels('Evento', 'Eventos', false),
        'menu_icon'   => 'dashicons-calendar-alt',
        'has_archive' => 'eventos',
        'rewrite'     => ['slug' => 'eventos', 'with_front' => false],
        'supports'    => ['title', 'editor', 'excerpt', 'thumbnail'],
    ]);
    register_post_type('producao', [
        'labels'        => labho_labels('Produção', 'Produções', true),
        'public'        => false,
        'show_ui'       => true,
        'show_in_rest'  => true,
        'menu_position' => 5,
        'menu_icon'     => 'dashicons-video-alt3',
        'supports'      => ['title', 'excerpt', 'thumbnail', 'page-attributes'],
    ]);
});

function labho_labels($one, $many, $fem) {
    $low = mb_strtolower($one);
    return [
        'name' => $many, 'singular_name' => $one, 'menu_name' => $many,
        'add_new' => 'Adicionar', 'add_new_item' => ($fem ? 'Nova ' : 'Novo ') . $low,
        'edit_item' => 'Editar ' . $low, 'all_items' => 'Todos',
        'search_items' => 'Buscar', 'not_found' => 'Nada encontrado',
        'featured_image' => $one === 'Entrevista' ? 'Foto do(a) entrevistado(a)' : 'Imagem principal',
        'set_featured_image' => 'Definir imagem', 'remove_featured_image' => 'Remover imagem',
    ];
}

add_action('after_switch_theme', 'flush_rewrite_rules');

// ordenação: eventos por data (mais recente primeiro), projetos pela ordem manual
add_action('pre_get_posts', function ($q) {
    if (is_admin() || !$q->is_main_query()) return;
    if ($q->is_post_type_archive('evento')) {
        foreach (labho_events_order() as $k => $v) $q->set($k, $v);
        $q->set('posts_per_page', -1);
    }
    if ($q->is_post_type_archive('projeto')) {
        $q->set('orderby', ['menu_order' => 'ASC', 'date' => 'ASC']);
        $q->set('posts_per_page', -1);
    }
});

// Ordena eventos pela data (mais recente primeiro) sem excluir eventos que ainda não têm data
function labho_events_order() {
    return [
        'meta_query' => ['relation' => 'OR', 'data' => ['key' => '_labho_data', 'compare' => 'EXISTS'], ['key' => '_labho_data', 'compare' => 'NOT EXISTS']],
        'orderby'    => ['data' => 'DESC', 'date' => 'DESC'],
    ];
}

/* ---------- campos extras (meta boxes nativas, sem plugin) ---------- */
function labho_fields() {
    return [
        'entrevista' => [
            'projeto'  => ['Projeto do acervo', 'projeto'],
            'destaque' => ['Fala em destaque — aparece nos balões da página inicial (curta, 1 frase)', 'textarea'],
            'youtube'  => ['Vídeo no YouTube (link)', 'url'],
            'pdf'      => ['Transcrição em PDF', 'file'],
            'ficha'    => ["Ficha técnica — uma linha por item, ex.:\nEntrevistador(a): Fulana\nData: 12/05/2024\nLocal: Viçosa, MG\nDuração: 1h 42min", 'textarea'],
        ],
        'evento' => [
            'data'         => ['Data do evento', 'date'],
            'local'        => ['Local', 'text'],
            'video'        => ['Gravação (YouTube/Drive)', 'url'],
            'certificados' => ['Pasta de certificados (Drive)', 'url'],
        ],
        'producao' => [
            'tipo' => ['Tipo', ['YouTube', 'Site', 'Drive', 'Artigo', 'Livro', 'Outro']],
            'url'  => ['Link', 'url'],
        ],
    ];
}

add_action('add_meta_boxes', function () {
    $titles = ['entrevista' => 'Dados da entrevista', 'evento' => 'Dados do evento', 'producao' => 'Dados da produção'];
    foreach (labho_fields() as $type => $fields) {
        add_meta_box('labho_' . $type, $titles[$type], 'labho_render_box', $type, 'normal', 'high', $fields);
    }
});

function labho_render_box($post, $box) {
    wp_nonce_field('labho_save', 'labho_nonce');
    echo '<table class="form-table" role="presentation">';
    foreach ($box['args'] as $key => $f) {
        list($label, $type) = $f;
        $id = 'labho_' . $key;
        $val = get_post_meta($post->ID, '_labho_' . $key, true);
        printf('<tr><th><label for="%s">%s</label></th><td>', $id, nl2br(esc_html($label)));
        if (is_array($type)) {
            echo "<select id='$id' name='$id'>";
            foreach ($type as $opt) printf('<option %s>%s</option>', selected($val, $opt, false), esc_html($opt));
            echo '</select>';
        } elseif ($type === 'projeto') {
            echo "<select id='$id' name='$id'><option value=''>—</option>";
            foreach (get_posts(['post_type' => 'projeto', 'numberposts' => -1, 'orderby' => 'menu_order', 'order' => 'ASC']) as $p) {
                printf('<option value="%d" %s>%s</option>', $p->ID, selected((int) $val, $p->ID, false), esc_html($p->post_title));
            }
            echo '</select>';
        } elseif ($type === 'textarea') {
            printf('<textarea id="%s" name="%s" rows="4" class="large-text">%s</textarea>', $id, $id, esc_textarea($val));
        } elseif ($type === 'file') {
            printf('<input id="%1$s" name="%1$s" type="url" class="regular-text" value="%2$s"> <button type="button" class="button labho-media" data-target="%1$s">Enviar / escolher PDF</button>', $id, esc_attr($val));
        } else {
            printf('<input id="%1$s" name="%1$s" type="%2$s" class="regular-text" value="%3$s">', $id, $type, esc_attr($val));
        }
        echo '</td></tr>';
    }
    echo '</table>';
}

add_action('save_post', function ($post_id, $post) {
    $all = labho_fields();
    if (!isset($all[$post->post_type]) || !isset($_POST['labho_nonce']) || !wp_verify_nonce($_POST['labho_nonce'], 'labho_save')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;
    foreach ($all[$post->post_type] as $key => $f) {
        $type = $f[1];
        $raw = wp_unslash(isset($_POST['labho_' . $key]) ? $_POST['labho_' . $key] : '');
        if ($type === 'url' || $type === 'file') $val = esc_url_raw($raw);
        elseif ($type === 'textarea') $val = sanitize_textarea_field($raw);
        elseif ($type === 'projeto') $val = absint($raw);
        elseif ($type === 'date') $val = preg_match('/^\d{4}-\d{2}-\d{2}$/', $raw) ? $raw : '';
        else $val = sanitize_text_field($raw);
        update_post_meta($post_id, '_labho_' . $key, $val);
    }
}, 10, 2);

// botão "Enviar / escolher PDF" abre a biblioteca de mídia do WP
add_action('admin_enqueue_scripts', function ($hook) {
    if (!in_array($hook, ['post.php', 'post-new.php'], true)) return;
    wp_enqueue_media();
    wp_add_inline_script('jquery-core', "jQuery(function($){\$(document).on('click','.labho-media',function(e){e.preventDefault();var t=\$('#'+\$(this).data('target'));var f=wp.media({title:'Escolher arquivo',library:{type:'application/pdf'},multiple:false});f.on('select',function(){t.val(f.state().get('selection').first().toJSON().url)});f.open();});});");
});

// colunas úteis nas listagens do painel
add_filter('manage_entrevista_posts_columns', function ($c) { return array_slice($c, 0, 2) + ['projeto' => 'Projeto'] + $c; });
add_action('manage_entrevista_posts_custom_column', function ($col, $id) {
    if ($col === 'projeto' && ($p = labho_meta('projeto', $id))) echo esc_html(get_the_title($p));
}, 10, 2);
add_filter('manage_evento_posts_columns', function ($c) { return array_slice($c, 0, 2) + ['data_evento' => 'Data do evento'] + $c; });
add_action('manage_evento_posts_custom_column', function ($col, $id) {
    if ($col === 'data_evento') echo esc_html(labho_date(labho_meta('data', $id)));
}, 10, 2);

/* ---------- Aparência › Personalizar › Contatos ---------- */
function labho_defaults() {
    return [
        'email'     => 'labho.dhi@ufv.br',
        'endereco'  => "Departamento de História — UFV\nAv. P. H. Rolfs, s/n\nViçosa, MG · 36570-900",
        'instagram' => 'https://instagram.com/',
        'youtube'   => 'https://youtube.com/',
    ];
}

add_action('customize_register', function ($wp) {
    $wp->add_section('labho_contato', ['title' => 'Contatos do laboratório', 'priority' => 30]);
    $labels = ['email' => 'E-mail', 'endereco' => 'Endereço', 'instagram' => 'Instagram (link)', 'youtube' => 'YouTube (link)'];
    $san = ['email' => 'sanitize_email', 'endereco' => 'sanitize_textarea_field', 'instagram' => 'esc_url_raw', 'youtube' => 'esc_url_raw'];
    foreach (labho_defaults() as $k => $def) {
        $wp->add_setting("labho_$k", ['default' => $def, 'sanitize_callback' => $san[$k]]);
        $wp->add_control("labho_$k", ['label' => $labels[$k], 'section' => 'labho_contato', 'type' => $k === 'endereco' ? 'textarea' : 'text']);
    }
});

/* ---------- helpers de template ---------- */
function labho_meta($key, $id = null) {
    return get_post_meta($id ? $id : get_the_ID(), '_labho_' . $key, true);
}

function labho_opt($key) {
    $d = labho_defaults();
    return get_theme_mod('labho_' . $key, isset($d[$key]) ? $d[$key] : '');
}

function labho_date($iso, $fmt = 'd M Y') {
    return $iso ? date_i18n($fmt, strtotime($iso . ' 12:00')) : '';
}

// Título com animação palavra a palavra; *asteriscos* viram itálico. Ex.: "Vozes que *atravessam* o tempo."
function labho_split($text) {
    $out = [];
    $in = false;
    foreach (preg_split('/\s+/', trim(wp_strip_all_tags($text))) as $i => $w) {
        $n = substr_count($w, '*');
        $clean = esc_html(str_replace('*', '', $w));
        $out[] = sprintf('<span class="w"><span style="--i:%d">%s</span></span>', $i, ($in || $n) ? "<em>$clean</em>" : $clean);
        if ($n % 2) $in = !$in;
    }
    return implode(' ', $out);
}

// Wordmark do hero: uma <span> por letra (para a entrada escalonada), linhas quebram no mobile
function labho_letters(array $lines) {
    $i = 0;
    $html = '';
    foreach ($lines as $line) {
        $html .= '<span class="wm__line" aria-hidden="true">';
        foreach (preg_split('//u', $line, -1, PREG_SPLIT_NO_EMPTY) as $ch) {
            $html .= $ch === ' ' ? '<span class="l sp"> </span>' : sprintf('<span class="l" style="--i:%d">%s</span>', $i++, esc_html($ch));
        }
        $html .= '</span>';
    }
    return $html;
}

// Título limpo (sem asteriscos) para <title>, alt, etc.
add_filter('the_title', function ($t) { return is_admin() ? $t : str_replace('*', '', $t); });
add_filter('document_title_parts', function ($p) {
    $p['title'] = str_replace('*', '', $p['title']);
    unset($p['tagline']); // o slogan já vai na meta description
    return $p;
});

// Imagem com gradiente de reserva enquanto não houver foto
function labho_ph($attachment_id = 0, $class = '', $size = 'large', $tag = '', $seed = 0) {
    $pal = [['#9C5A36', '#2A1911'], ['#23324A', '#0E1420'], ['#C8923A', '#3A2610'], ['#6B3F26', '#170E09'], ['#4E5A3A', '#1A1F12'], ['#A9502B', '#2B150B']];
    $c = $pal[abs((int) $seed) % count($pal)];
    $img = $attachment_id ? wp_get_attachment_image($attachment_id, $size, false, ['loading' => 'lazy', 'decoding' => 'async']) : '';
    return sprintf('<div class="ph %s" style="--c1:%s;--c2:%s">%s%s</div>', esc_attr($class), $c[0], $c[1], $img, $tag ? '<span class="ph__tag">' . esc_html($tag) . '</span>' : '');
}

// IDs das imagens dos blocos "Galeria" do conteúdo
function labho_gallery_ids($post = null) {
    $post = get_post($post);
    $ids = [];
    if (!$post) return $ids;
    foreach (parse_blocks($post->post_content) as $b) {
        if ($b['blockName'] !== 'core/gallery') continue;
        foreach ($b['innerBlocks'] as $img) if (!empty($img['attrs']['id'])) $ids[] = (int) $img['attrs']['id'];
        if (!empty($b['attrs']['ids'])) foreach ($b['attrs']['ids'] as $id) $ids[] = (int) $id; // galerias antigas
    }
    return array_values(array_unique($ids));
}

// Conteúdo sem blocos de galeria (a galeria é desenhada à parte, em grade)
function labho_content_without_gallery($post = null) {
    $post = get_post($post);
    if (!$post) return '';
    $blocks = array_filter(parse_blocks($post->post_content), function ($b) { return $b['blockName'] !== 'core/gallery'; });
    // pipeline padrão do WordPress (embeds, shortcodes, imagens responsivas, wpautop só em conteúdo clássico)
    return apply_filters('the_content', serialize_blocks($blocks));
}

function labho_gallery($post = null, $title = 'Galeria') {
    $ids = labho_gallery_ids($post);
    if (!$ids) return '';
    $html = '<h2 class="sec-title rv">' . esc_html($title) . '</h2><div class="gallery">';
    foreach ($ids as $i => $id) $html .= labho_ph($id, 'rv', 'large', wp_get_attachment_caption($id), $i);
    return $html . '</div>';
}

function labho_youtube_id($url) {
    return preg_match('~(?:youtu\.be/|v=|embed/|shorts/|live/)([\w-]{11})~', (string) $url, $m) ? $m[1] : '';
}

function labho_crumbs(array $items) {
    $parts = [];
    foreach ($items as $label => $url) {
        $parts[] = $url ? sprintf('<a href="%s">%s</a>', esc_url($url), esc_html($label)) : '<span>' . esc_html($label) . '</span>';
    }
    return '<nav class="crumbs rv" aria-label="Trilha">' . implode('<span>/</span>', $parts) . '</nav>';
}

function labho_page_head($args) {
    $a = wp_parse_args($args, ['crumbs' => [], 'eyebrow' => '', 'title' => '', 'lead' => '', 'image' => 0, 'media' => true, 'seed' => 0]);
    ?>
    <header class="phead">
        <?php echo labho_crumbs($a['crumbs']); ?>
        <div class="phead__grid">
            <div>
                <?php if ($a['eyebrow']) : ?><p class="eyebrow rv"><?php echo esc_html($a['eyebrow']); ?></p><?php endif; ?>
                <h1 class="split"><?php echo labho_split($a['title']); ?></h1>
            </div>
            <?php if ($a['lead']) : ?><p class="phead__lead rv" style="--d:.3s"><?php echo esc_html($a['lead']); ?></p><?php endif; ?>
        </div>
        <?php if ($a['media']) echo labho_ph($a['image'], 'phead__media rv', 'full', '', $a['seed']); ?>
    </header>
    <?php
}

// Menu usado enquanto nenhum for criado em Aparência › Menus
function labho_menu_fallback() {
    $items = [
        ['Laboratório', home_url('/laboratorio/'), is_page('laboratorio')],
        ['Acervo', get_post_type_archive_link('projeto'), is_post_type_archive('projeto') || is_singular(['projeto', 'entrevista'])],
        ['Eventos', get_post_type_archive_link('evento'), is_post_type_archive('evento') || is_singular('evento')],
        ['Contato', home_url('/contato/'), is_page('contato'), 'is-contato'], // no desktop vira o CTA à direita
    ];
    echo '<ul class="nav__list">';
    foreach ($items as $it) {
        $cls = trim(($it[2] ? 'current-menu-item ' : '') . (isset($it[3]) ? $it[3] : ''));
        printf('<li%s><a href="%s">%s</a></li>', $cls ? ' class="' . esc_attr($cls) . '"' : '', esc_url($it[1]), esc_html($it[0]));
    }
    echo '</ul>';
}

// Vozes da animação: falas em destaque das entrevistas
function labho_vozes($limit = 7) {
    $q = get_posts([
        'post_type' => 'entrevista', 'numberposts' => $limit, 'orderby' => 'rand',
        'meta_query' => [['key' => '_labho_destaque', 'value' => '', 'compare' => '!=']],
    ]);
    $out = [];
    foreach ($q as $p) {
        $proj = labho_meta('projeto', $p->ID);
        $out[] = [
            'q'   => wp_strip_all_tags(labho_meta('destaque', $p->ID)),
            'by'  => get_the_title($p) . ($proj ? ' · ' . get_the_title($proj) : ''),
            'url' => get_permalink($p),
        ];
    }
    return $out;
}
