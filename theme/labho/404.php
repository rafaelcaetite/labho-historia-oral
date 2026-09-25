<?php
get_header();
labho_page_head([
  'crumbs'  => ['Início' => home_url('/')],
  'eyebrow' => '404',
  'title'   => 'Silêncio *por aqui.*',
  'lead'    => 'Esta página não existe ou foi movida.',
  'media'   => false,
]); ?>
<div class="wrap" style="padding:40px var(--gut) 20vh"><a class="cta" href="<?php echo esc_url(home_url('/')); ?>">Voltar ao início</a></div>
<?php get_footer();
