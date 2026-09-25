</main>

<footer class="foot">
  <div class="foot__top">
    <p class="foot__big">Toda memória<br><em>começa com uma escuta.</em></p>
    <div class="foot__cols">
      <div>
        <h2 class="eyebrow">Contatos</h2>
        <a href="mailto:<?php echo esc_attr(antispambot(labho_opt('email'))); ?>"><?php echo esc_html(antispambot(labho_opt('email'))); ?></a>
        <?php if (labho_opt('instagram')) : ?><a href="<?php echo esc_url(labho_opt('instagram')); ?>" target="_blank" rel="noopener">Instagram ↗</a><?php endif; ?>
        <?php if (labho_opt('youtube')) : ?><a href="<?php echo esc_url(labho_opt('youtube')); ?>" target="_blank" rel="noopener">YouTube ↗</a><?php endif; ?>
      </div>
      <div>
        <h2 class="eyebrow">Navegar</h2>
        <a href="<?php echo esc_url(home_url('/')); ?>">Início</a>
        <a href="<?php echo esc_url(home_url('/laboratorio/')); ?>">Sobre</a>
        <a href="<?php echo esc_url(get_post_type_archive_link('projeto')); ?>">Acervo</a>
        <a href="<?php echo esc_url(get_post_type_archive_link('evento')); ?>">Eventos</a>
        <a href="<?php echo esc_url(home_url('/contato/')); ?>">Contato</a>
      </div>
    </div>
  </div>
  <div class="foot__apoio">
    <a class="foot__ufv" href="https://www.ufv.br/" target="_blank" rel="noopener">
      <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/img/ufv100-laranja.png'); ?>" width="420" height="183" loading="lazy" alt="UFV — 100 anos, 1926–2026">
    </a>
    <?php if (is_active_sidebar('apoio')) : ?>
      <div>
        <h2 class="eyebrow">Apoio</h2>
        <div class="logos"><?php dynamic_sidebar('apoio'); ?></div>
      </div>
    <?php endif; ?>
  </div>
</footer>

<dialog id="video" class="video">
  <button class="video__close" aria-label="Fechar vídeo">Fechar ✕</button>
  <div class="video__frame"></div>
</dialog>

<div class="cursor" aria-hidden="true"></div>
<?php wp_footer(); ?>
</body>
</html>
