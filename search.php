<?php get_header(); ?>
<?php $queried_object = get_queried_object(); ?>

<main class="tintuc">

<section class="tintuc-banner search-banner position-relative">
    <div class="container">
        <form class="form-search position-absolute" action="<?php echo get_home_url(); ?>" method="get">
            <input type="text" name="s" id="s" placeholder="Tìm kiếm" value="<?php echo get_search_query(); ?>">
            <button class="submit-btn" type="submit">
                <i class="far fa-search"></i>
            </button>
        </form>
    </div>
</section>

<section class="tintuc-main">
    <div class="container">
        <div class="tintuc-main-wrap bg-white position-relative">
            <div class="tintuc-content">
                <div class="row">
                    <div class="col-xl-9">
                        <div class="tintuc-main-search-report">
                            Kết quả tìm kiếm với từ khoá <strong>"<?php echo get_search_query(); ?>"</strong>
                        </div>
                        <div class="tintuc-main-listing">
                            <?php if (have_posts()) : ?>
                                <?php while (have_posts()) : the_post(); ?>
                                    <article>
                                        <div class="image-box position-relative">
                                            <?php $thumb = get_the_post_thumbnail_url(); ?>
                                            <a href="<?php the_permalink(); ?>" class="img-animate">
                                                <?php if ( $thumb ) { ?>
                                                    <img src="<?php echo $thumb ?>" alt="<?php the_title(); ?>">
                                                <?php } else { ?>
                                                    <img style="object-fit:contain" src="<?php bloginfo('template_url') ?>/assets/images/logojkt.jpeg" alt="<?php the_title(); ?>">
                                                <?php } ?>
                                            </a>
                                        </div>
                                        <div class="content-box">
                                            <h3 class="title">
                                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                            </h3>
                                            <div class="date"><i class="fal fa-calendar-alt"></i> <?php echo get_the_date("d/m/Y") ?></div>
                                            <div class="excerpt">
                                                <?php echo wp_trim_words( get_the_content(), $num_words = 50, $more = null ); ?>
                                            </div>
                                        </div>
                                    </article>
                                <?php endwhile;?>
                            <?php else : ?>
                                <p>Không tìm thấy kết quả phù hợp</p>
                            <?php endif; ?>

                        </div>

                        <div class="tintuc-main-pagination">
                            <?php jks_wp_pagination(); ?>
                        </div>

                    </div>
                    <div class="col-xl-3">
                        <?php get_sidebar(); ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

</main>

<?php get_footer(); ?>