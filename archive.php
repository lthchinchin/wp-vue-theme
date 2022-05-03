<?php get_header(); ?>
<?php $queried_object = get_queried_object(); ?>

<main class="tintuc">

<section class="tintuc-banner position-relative">
    <h1 class="text-white text-center text-uppercase position-absolute fw-bold">
        <?php echo $queried_object->name; ?>
    </h1>
</section>

<section class="tintuc-main">
    <div class="tintuc-breadcrumb">
        <div class="container">
            <?php if ( function_exists('yoast_breadcrumb') ) { yoast_breadcrumb( '<p id="breadcrumbs">','</p>' ); } ?>
        </div>
    </div>
    <div class="container">
        <div class="tintuc-main-wrap bg-white position-relative">
            <div class="tintuc-content">
                <div class="row gx-5">
                    <div class="col-xl-8">
                        <?php 
                        $categories = get_categories( 
                            array( 
                                'hide_empty' => false,
                                'orderby' => 'name',
                                'order'   => 'DESC'    
                            ) 
                        );
                        ?>
                        <div class="tintuc-main-category">
                            <ul class="list-unstyled d-flex position-relative">
                                <?php foreach( $categories as $category ) : ?>
                                <li>
                                    <a class="<?php if ( $queried_object->term_id == $category->term_id ) { echo 'active'; } ?>" href="<?php echo get_category_link($category->term_id); ?>">
                                        <?php echo $category->name; ?>
                                    </a>
                                </li>
                                <?php endforeach; ?>
                            </ul>
                        </div>

                        <div class="tintuc-main-listing">
                            <?php if ( have_posts() ) : ?>
                            <?php while (have_posts()) : the_post(); ?>
                                <article>
                                    <div class="image-box position-relative">
                                        <a href="<?php the_permalink(); ?>" class="img-animate">
                                            <img src="<?php the_post_thumbnail_url( 'full' ); ?>" alt="<?php the_title(); ?>">
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
                                <p>Dữ liệu đang cập nhập...</p>
                            <?php endif; ?>

                        </div>

                        <div class="tintuc-main-pagination">
                            <?php jks_wp_pagination(); ?>
                        </div>

                    </div>
                    <div class="col-xl-4">
                        <?php get_sidebar(); ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

</main>

<?php get_footer(); ?>