<?php
/* Página da entrevista: foto, bio, vídeo (pop-up), PDF, ficha técnica, galeria em grade. */
get_header();
while (have_posts()) : the_post();
  $proj  = (int) labho_meta('projeto');
  $yt    = labho_youtube_id(labho_meta('youtube'));
  $pdf   = labho_meta('pdf');
  $ficha = array_filter(array_map('trim', explode("\n", (string) labho_meta('ficha'))));
  $crumbs = ['Acervo' => get_post_type_archive_link('projeto')];
  if ($proj) $crumbs[get_the_title($proj)] = get_permalink($proj) . '#entrevistas';
  $crumbs[get_the_title()] = ''; ?>

  <article class="iv">
    <?php echo labho_ph(get_post_thumbnail_id(), 'iv__photo rv', 'large', '', get_the_ID()); ?>
    <div>
      <?php echo labho_crumbs($crumbs); ?>
      <?php if (has_excerpt()) : ?><p class="eyebrow rv"><?php echo esc_html(get_the_excerpt()); ?></p><?php endif; ?>
      <h1 class="split"><?php echo labho_split(get_post_field('post_title')); ?></h1>
      <div class="iv__bio rv"><?php echo labho_content_without_gallery(); ?></div>

      <div class="iv__actions rv">
        <?php if ($yt) : ?>
          <button type="button" class="cta cta--solid" data-yt="<?php echo esc_attr($yt); ?>">Assistir entrevista</button>
        <?php elseif (labho_meta('youtube')) : ?>
          <a class="cta cta--solid" href="<?php echo esc_url(labho_meta('youtube')); ?>" target="_blank" rel="noopener">Assistir entrevista</a>
        <?php endif; ?>
        <?php if ($pdf) : ?><a class="cta" href="<?php echo esc_url($pdf); ?>" target="_blank" rel="noopener">Transcrição (PDF)</a><?php endif; ?>
      </div>

      <?php if ($ficha) : ?>
        <p class="eyebrow rv">Ficha técnica</p>
        <dl class="ficha rv">
          <?php foreach ($ficha as $linha) :
            $parts = array_map('trim', explode(':', $linha, 2)); ?>
            <dt><?php echo esc_html($parts[0]); ?></dt><dd><?php echo esc_html(isset($parts[1]) ? $parts[1] : ''); ?></dd>
          <?php endforeach; ?>
        </dl>
      <?php endif; ?>
    </div>
  </article>
  <?php echo labho_gallery();
endwhile;
get_footer();
