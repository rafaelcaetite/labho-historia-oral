<?php
/* Página do evento: banner, descrição, vídeo, certificados, galeria. */
get_header();
while (have_posts()) : the_post();
  $meta = array_filter([labho_date(labho_meta('data')), labho_meta('local')]);
  labho_page_head([
    'crumbs'  => ['Início' => home_url('/'), 'Eventos' => get_post_type_archive_link('evento'), get_the_title() => ''],
    'eyebrow' => implode(' · ', $meta),
    'title'   => get_post_field('post_title'),
    'lead'    => has_excerpt() ? get_the_excerpt() : '',
    'image'   => get_post_thumbnail_id(),
    'seed'    => get_the_ID(),
  ]); ?>
  <section class="prose">
    <p class="eyebrow rv">Sobre</p>
    <div class="prose__body rv">
      <?php echo labho_content_without_gallery(); ?>
      <div class="iv__actions">
        <?php if ($v = labho_meta('video')) :
          $yt = labho_youtube_id($v);
          if ($yt) : ?><button type="button" class="cta cta--solid" data-yt="<?php echo esc_attr($yt); ?>">Assistir gravação</button>
          <?php else : ?><a class="cta cta--solid" href="<?php echo esc_url($v); ?>" target="_blank" rel="noopener">Assistir gravação</a><?php endif;
        endif; ?>
        <?php if ($c = labho_meta('certificados')) : ?><a class="cta" href="<?php echo esc_url($c); ?>" target="_blank" rel="noopener">Certificados</a><?php endif; ?>
      </div>
    </div>
  </section>
  <?php echo labho_gallery();
endwhile;
get_footer();
