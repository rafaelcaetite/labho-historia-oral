<?php
get_header();
labho_page_head([
  'crumbs'  => ['Início' => home_url('/'), 'Acervo' => ''],
  'eyebrow' => 'Acervo',
  'title'   => 'Projetos de entrevistas',
  'lead'    => 'Entrevistas de história de vida filmadas, transcritas e abertas à consulta pública.',
  'media'   => false,
]); ?>
<section class="projects">
  <?php $i = 0; while (have_posts()) : the_post();
    $n = count(get_posts(['post_type' => 'entrevista', 'numberposts' => -1, 'fields' => 'ids', 'meta_key' => '_labho_projeto', 'meta_value' => get_the_ID()])); ?>
    <a class="proj rv" style="--d:<?php echo esc_attr($i * 0.1); ?>s" href="<?php the_permalink(); ?>">
      <?php echo labho_ph(get_post_thumbnail_id(), '', 'large', '', $i); ?>
      <div class="proj__txt">
        <p class="eyebrow">Projeto <?php echo esc_html(str_pad($i + 1, 2, '0', STR_PAD_LEFT)); ?></p>
        <h2><?php the_title(); ?></h2>
        <span><?php echo esc_html($n === 1 ? '1 entrevista' : "$n entrevistas"); ?> →</span>
      </div>
    </a>
  <?php $i++; endwhile; ?>
</section>
<?php if (!$i) : ?><p class="people__empty">Nenhum projeto publicado ainda.</p><?php endif;
get_footer();
