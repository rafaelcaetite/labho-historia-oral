<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#975428">
  <?php if (!has_site_icon()) : ?>
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='16' fill='%23975428'/%3E%3Cpath d='M9 11h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-8l-5 4v-4H9a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z' fill='%23E1DFD5'/%3E%3C/svg%3E">
  <?php endif; ?>
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip" href="#main">Pular para o conteúdo</a>

<?php if (is_front_page()) : ?>
<section class="hero" aria-label="Laboratório de História Oral">
  <a class="hero__logo" href="https://www.ufv.br/" target="_blank" rel="noopener">
    <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/img/ufv100-branco.png'); ?>" width="1168" height="509" alt="UFV — 100 anos, 1926–2026">
  </a>
  <h1 class="hero__wm" data-wm aria-label="Laboratório de História Oral">
    <?php echo labho_letters(['Laboratório de', 'História Oral']); ?>
  </h1>
</section>
<?php endif; ?>

<header class="nav" id="nav">
  <button class="nav__toggle" aria-expanded="false" aria-controls="menu">Menu</button>
  <nav id="menu" class="nav__menu" aria-label="Principal">
    <?php wp_nav_menu([
      'theme_location' => 'principal',
      'container'      => false,
      'menu_class'     => 'nav__list',
      'depth'          => 1,
      'fallback_cb'    => 'labho_menu_fallback',
    ]); ?>
  </nav>
  <a class="nav__wm" href="<?php echo esc_url(home_url('/')); ?>" aria-label="Laboratório de História Oral — início">Laboratório de História Oral</a>
  <div class="nav__end">
    <a class="nav__cta" href="<?php echo esc_url(home_url('/contato/')); ?>">Contato <svg width="7" height="11" viewBox="0 0 7 11" aria-hidden="true"><path d="M1 1l4.5 4.5L1 10" fill="none" stroke="currentColor" stroke-width="1.2"/></svg></a>
  </div>
</header>

<main id="main" tabindex="-1">
