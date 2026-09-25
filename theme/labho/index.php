<?php
/* Fallback (notícias, busca, arquivos não previstos). */
get_header();
$title = is_search() ? 'Busca: ' . get_search_query() : (is_home() ? (single_post_title('', false) ?: 'Publicações') : wp_strip_all_tags(get_the_archive_title()));
labho_page_head([
  'crumbs' => ['Início' => home_url('/'), $title => ''],
  'title'  => $title,
  'media'  => false,
]); ?>
<ul class="events">
  <?php while (have_posts()) : the_post(); ?>
    <li class="ev rv"><a href="<?php the_permalink(); ?>"><time><?php echo esc_html(get_the_date('d M Y')); ?></time><h2><?php the_title(); ?></h2><span>Ler →</span></a></li>
  <?php endwhile; ?>
</ul>
<div class="wrap" style="padding-bottom:80px"><?php the_posts_pagination(); ?></div>
<?php get_footer();
