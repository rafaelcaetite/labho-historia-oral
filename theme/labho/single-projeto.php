<?php
/* Projeto do acervo — abas Apresentação / Entrevistas (estrutura CPDOC). */
get_header();
while (have_posts()) : the_post();
  $list = get_posts(['post_type' => 'entrevista', 'numberposts' => -1, 'meta_key' => '_labho_projeto', 'meta_value' => get_the_ID(), 'orderby' => 'title', 'order' => 'ASC']);
  $norm = function ($s) { return strtolower(remove_accents($s)); };
  $letters = [];
  foreach ($list as $e) $letters[strtoupper(substr($norm($e->post_title), 0, 1))] = true;

  labho_page_head([
    'crumbs'  => ['Início' => home_url('/'), 'Acervo' => get_post_type_archive_link('projeto'), get_the_title() => ''],
    'eyebrow' => 'Projeto de entrevistas',
    'title'   => get_post_field('post_title'),
    'lead'    => has_excerpt() ? get_the_excerpt() : '',
    'image'   => get_post_thumbnail_id(),
  ]); ?>

  <div data-tabs>
    <nav class="tabs" aria-label="Seções">
      <a href="#apresentacao">Apresentação</a>
      <a href="#entrevistas">Entrevistas</a>
    </nav>

    <div id="apresentacao" data-panel>
      <section class="prose">
        <p class="eyebrow rv">Apresentação</p>
        <div class="prose__body rv">
          <?php echo labho_content_without_gallery(); ?>
          <a class="cta" href="#entrevistas">Ver entrevistas</a>
        </div>
      </section>
      <?php echo labho_gallery(); ?>
    </div>

    <div id="entrevistas" data-panel data-finder>
      <section class="finder">
        <div class="finder__row"><label for="q">Buscar por nome</label><input id="q" type="search" placeholder="Digite um nome…" autocomplete="off"></div>
        <div class="az" role="group" aria-label="Filtrar por inicial">
          <?php foreach (range('A', 'Z') as $l) : ?>
            <button type="button" data-l="<?php echo $l; ?>" aria-pressed="false" <?php disabled(empty($letters[$l])); ?>><?php echo $l; ?></button>
          <?php endforeach; ?>
          <button type="button" class="all" data-l="" aria-pressed="true">Todos</button>
        </div>
      </section>
      <ul class="people">
        <?php foreach ($list as $i => $e) : ?>
          <li class="person rv" style="--d:<?php echo esc_attr(($i % 4) * 0.06); ?>s" data-n="<?php echo esc_attr($norm($e->post_title)); ?>">
            <a href="<?php echo esc_url(get_permalink($e)); ?>">
              <?php echo labho_ph(get_post_thumbnail_id($e), '', 'medium_large', '', $i); ?>
              <h3><?php echo esc_html(get_the_title($e)); ?></h3>
              <?php if ($e->post_excerpt) : ?><p><?php echo esc_html($e->post_excerpt); ?></p><?php endif; ?>
            </a>
          </li>
        <?php endforeach; ?>
      </ul>
      <p class="people__empty" <?php echo $list ? 'hidden' : ''; ?>>Nenhuma entrevista encontrada.</p>
    </div>
  </div>
<?php endwhile;
get_footer();
