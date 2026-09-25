<?php
/* Página com slug "laboratorio": aba Quem somos (conteúdo da página) + aba Produções (tipo Produções). */
get_header();
while (have_posts()) : the_post();
  $prods = get_posts(['post_type' => 'producao', 'numberposts' => -1, 'orderby' => ['menu_order' => 'ASC', 'date' => 'DESC']]);
  labho_page_head([
    'crumbs'  => ['Início' => home_url('/'), 'Sobre' => ''],
    'eyebrow' => 'Sobre',
    'title'   => get_post_field('post_title'),
    'lead'    => has_excerpt() ? get_the_excerpt() : 'Um espaço de pesquisa, ensino e extensão dedicado à história oral no Departamento de História da UFV.',
    'image'   => get_post_thumbnail_id(),
    'seed'    => 3,
  ]); ?>

  <div data-tabs>
    <nav class="tabs" aria-label="Seções">
      <a href="#quem-somos">Quem somos</a>
      <a href="#producoes">Produções</a>
    </nav>

    <div id="quem-somos" data-panel>
      <section class="prose">
        <p class="eyebrow rv">Apresentação</p>
        <div class="prose__body rv"><?php echo labho_content_without_gallery(); ?></div>
      </section>
      <?php echo labho_gallery(); ?>
    </div>

    <div id="producoes" data-panel>
      <section class="prose">
        <p class="eyebrow rv">Produções</p>
        <div class="prose__body rv"><p>Vídeos, publicações e materiais produzidos a partir do acervo e das atividades do laboratório.</p></div>
      </section>
      <ul class="prods">
        <?php foreach ($prods as $i => $p) : $url = labho_meta('url', $p->ID); ?>
          <li class="prod rv" style="--d:<?php echo esc_attr(($i % 3) * 0.08); ?>s">
            <?php echo labho_ph(get_post_thumbnail_id($p), '', 'large', '', $i); ?>
            <span class="pill"><?php echo esc_html(labho_meta('tipo', $p->ID) ?: 'Produção'); ?></span>
            <h3><?php echo esc_html(get_the_title($p)); ?></h3>
            <?php if ($p->post_excerpt) : ?><p><?php echo esc_html($p->post_excerpt); ?></p><?php endif; ?>
            <?php if ($url) : ?><a class="link" href="<?php echo esc_url($url); ?>" target="_blank" rel="noopener">Acessar ↗</a><?php endif; ?>
          </li>
        <?php endforeach; ?>
      </ul>
      <?php if (!$prods) : ?><p class="people__empty">Em breve.</p><?php endif; ?>
    </div>
  </div>
<?php endwhile;
get_footer();
