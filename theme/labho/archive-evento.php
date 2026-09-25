<?php
get_header();
labho_page_head([
  'crumbs'  => ['Início' => home_url('/'), 'Eventos' => ''],
  'eyebrow' => 'Agenda',
  'title'   => 'Eventos',
  'lead'    => 'Seminários, oficinas, mostras e rodas de conversa promovidos pelo laboratório.',
  'media'   => false,
]); ?>
<ul class="events">
  <?php $i = 0; while (have_posts()) : the_post();
    $img = get_the_post_thumbnail_url(null, 'medium_large'); ?>
    <li class="ev rv" style="--d:<?php echo esc_attr(min($i, 6) * 0.06); ?>s" <?php if ($img) echo 'data-img="' . esc_url($img) . '"'; ?>>
      <a href="<?php the_permalink(); ?>">
        <time datetime="<?php echo esc_attr(labho_meta('data')); ?>"><?php echo esc_html(labho_date(labho_meta('data'))); ?></time>
        <h2><?php the_title(); ?></h2>
        <span><?php echo esc_html(labho_meta('local') ?: 'Ver evento'); ?> →</span>
      </a>
    </li>
  <?php $i++; endwhile; ?>
</ul>
<?php if (!$i) : ?><p class="people__empty">Nenhum evento publicado ainda.</p><?php endif; ?>
<div class="ev-preview ph" aria-hidden="true"></div>
<?php get_footer();
