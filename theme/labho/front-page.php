<?php
/**
 * Página inicial. Conteúdo vem da página definida em Configurações › Leitura › "Sua página inicial exibe":
 * - Título  → manchete do banner (*palavra* = itálico)
 * - Imagem destacada → foto do banner
 * - Resumo  → frase de apresentação
 * - Conteúdo → texto de apresentação; um bloco Galeria vira o carrossel
 */
get_header();

$front = get_option('show_on_front') === 'page' ? get_post(get_option('page_on_front')) : null;
$title = $front && $front->post_title ? $front->post_title : 'Vozes que *atravessam* o tempo.';
$lead  = $front && $front->post_excerpt ? $front->post_excerpt : 'Registramos, preservamos e devolvemos à sociedade as memórias de quem raramente foi ouvido pelos arquivos oficiais.';
$vozes = labho_vozes();
$fotos = $front ? labho_gallery_ids($front) : [];
$projetos = get_posts(['post_type' => 'projeto', 'numberposts' => -1, 'orderby' => ['menu_order' => 'ASC', 'date' => 'ASC']]);
$evento = get_posts(['post_type' => 'evento', 'numberposts' => 1] + labho_events_order());
?>

<section class="intro">
  <div class="intro__text">
    <h2 class="intro__title split"><?php echo labho_split($title); ?></h2>
    <p class="intro__lead rv"><?php echo esc_html($lead); ?></p>
    <div class="intro__body rv" style="--d:.12s">
      <?php echo $front ? labho_content_without_gallery($front) : '<p>O LabHO reúne pesquisadoras, pesquisadores e estudantes do Departamento de História da UFV em torno da história oral como método, fonte e compromisso público.</p>'; ?>
      <a class="link-it" href="<?php echo esc_url(home_url('/laboratorio/')); ?>">Conheça o laboratório</a>
    </div>
  </div>
  <?php echo labho_ph($front ? get_post_thumbnail_id($front) : 0, 'intro__media rv', 'full'); ?>
</section>

<?php if (count($vozes) >= 2) : ?>
<section class="voices" aria-label="Vozes do acervo">
  <div class="voices__stage">
    <div class="voices__head">
      <h2 class="voices__title">Quem conta, <em>faz história.</em></h2>
      <div class="voices__count"><span data-vc>01</span> / <?php echo esc_html(str_pad(count($vozes), 2, '0', STR_PAD_LEFT)); ?><small>Vozes do acervo</small></div>
    </div>
    <p class="voices__hint">Role para ouvir · <span class="on-hover">clique</span><span class="on-touch">toque</span> em alguém</p>
    <div class="voices__bar"><i></i></div>
  </div>
  <script type="application/json" id="vozes-data"><?php echo wp_json_encode($vozes, JSON_HEX_TAG | JSON_UNESCAPED_UNICODE); ?></script>
</section>
<?php endif; ?>

<?php if ($fotos) : ?>
<section class="carousel" aria-label="Galeria">
  <div class="carousel__head">
    <div><p class="eyebrow rv">Galeria</p><h2 class="split"><?php echo labho_split('Imagens da *memória*'); ?></h2></div>
    <div class="carousel__btns"><button data-car="-1" aria-label="Anterior">←</button><button data-car="1" aria-label="Próxima">→</button></div>
  </div>
  <div class="track" tabindex="0" aria-label="Fotos">
    <?php foreach ($fotos as $i => $id) : ?>
      <figure class="rv" style="--d:<?php echo esc_attr($i * 0.06); ?>s">
        <?php echo labho_ph($id, '', 'large', '', $i); ?>
        <?php if ($cap = wp_get_attachment_caption($id)) : ?><figcaption><span><?php echo esc_html($cap); ?></span></figcaption><?php endif; ?>
      </figure>
    <?php endforeach; ?>
  </div>
</section>
<?php endif; ?>

<?php foreach ($projetos as $i => $p) : ?>
<section class="split-block <?php echo $i % 2 ? 'rev' : ''; ?>">
  <?php echo labho_ph(get_post_thumbnail_id($p), 'rv', 'large', '', $i); ?>
  <div>
    <p class="eyebrow rv">Acervo · <?php echo esc_html(str_pad($i + 1, 2, '0', STR_PAD_LEFT)); ?></p>
    <h2 class="split"><?php echo labho_split($p->post_title); ?></h2>
    <?php if ($p->post_excerpt) : ?><p class="rv"><?php echo esc_html($p->post_excerpt); ?></p><?php endif; ?>
    <a class="cta rv" href="<?php echo esc_url(get_permalink($p)); ?>#entrevistas">Ver entrevistas</a>
  </div>
</section>
<?php endforeach; ?>

<section class="split-block">
  <div>
    <p class="eyebrow rv">Agenda</p>
    <h2 class="split"><?php echo labho_split('Encontros, oficinas e *rodas de conversa.*'); ?></h2>
    <p class="rv">Atividades abertas à comunidade para pensar a memória como prática coletiva.</p>
    <a class="cta cta--solid rv" href="<?php echo esc_url(get_post_type_archive_link('evento')); ?>">Todos os eventos</a>
  </div>
  <?php if ($evento) : ?>
    <a href="<?php echo esc_url(get_permalink($evento[0])); ?>" aria-label="<?php echo esc_attr(get_the_title($evento[0])); ?>">
      <?php echo labho_ph(get_post_thumbnail_id($evento[0]), 'rv', 'large', labho_date(labho_meta('data', $evento[0]->ID)) . ' — ' . get_the_title($evento[0]), 2); ?>
    </a>
  <?php else : echo labho_ph(0, 'rv', 'large', '', 2); endif; ?>
</section>

<?php get_footer();
