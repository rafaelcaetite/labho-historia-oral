<?php
/* Página com slug "contato". E-mail, endereço e redes vêm de Aparência › Personalizar › Contatos do laboratório. */
get_header();
while (have_posts()) : the_post();
  labho_page_head([
    'crumbs'  => ['Início' => home_url('/'), 'Contato' => ''],
    'eyebrow' => 'Contato',
    'title'   => get_post_field('post_title'),
    'lead'    => has_excerpt() ? get_the_excerpt() : 'Escreva para propor parcerias, doar acervos ou participar das atividades.',
    'image'   => get_post_thumbnail_id(),
    'seed'    => 5,
  ]);
  $email = antispambot(labho_opt('email')); ?>
  <section class="contact">
    <div class="rv"><p class="eyebrow">E-mail</p><a href="mailto:<?php echo esc_attr($email); ?>"><?php echo esc_html($email); ?></a></div>
    <div class="rv" style="--d:.08s"><p class="eyebrow">Endereço</p><address><?php echo nl2br(esc_html(labho_opt('endereco'))); ?></address></div>
    <div class="rv" style="--d:.16s"><p class="eyebrow">Redes</p>
      <?php if (labho_opt('instagram')) : ?><a href="<?php echo esc_url(labho_opt('instagram')); ?>" target="_blank" rel="noopener">Instagram ↗</a><?php endif; ?>
      <?php if (labho_opt('youtube')) : ?><a href="<?php echo esc_url(labho_opt('youtube')); ?>" target="_blank" rel="noopener">YouTube ↗</a><?php endif; ?>
    </div>
  </section>
  <?php if (trim(get_the_content())) : ?>
    <section class="prose"><span></span><div class="prose__body rv"><?php the_content(); ?></div></section>
  <?php endif;
endwhile;
get_footer();
