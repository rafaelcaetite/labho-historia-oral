<?php
get_header();
while (have_posts()) : the_post();
  labho_page_head([
    'crumbs'  => ['Início' => home_url('/'), get_the_title() => ''],
    'eyebrow' => get_bloginfo('name'),
    'title'   => get_post_field('post_title'),
    'lead'    => has_excerpt() ? get_the_excerpt() : '',
    'image'   => get_post_thumbnail_id(),
    'media'   => has_post_thumbnail(),
  ]); ?>
  <section class="prose">
    <span></span>
    <div class="prose__body rv"><?php echo labho_content_without_gallery(); ?></div>
  </section>
  <?php echo labho_gallery();
endwhile;
get_footer();
