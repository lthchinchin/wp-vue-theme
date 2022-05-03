<?php get_header(); ?>

<main class="tintuc tintuc-detail">

    <section class="tintuc-banner position-relative">
        <h1 class="text-white text-center text-uppercase fw-bold position-absolute"><?php the_title(); ?></h1>
    </section>

    <section class="tintuc-main position-relative">
        <div class="tintuc-breadcrumb bg-white p-0"></div>
        <div class="container">
            <div class="tintuc-main-wrap">
                <div class="tintuc-content">
                    <div class="row gx-5">
                        <div class="col-xl-8">
                            <div class="tintuc-main-detail">
                                <div class="product-info d-flex">
                                    <div class="product-image">
                                        <img src="<?php the_post_thumbnail_url( 'full' ); ?>" alt="<?php the_title(); ?>">
                                    </div>
                                    <div class="product-detail">
                                        <div class="tintuc-breadcrumb">
                                            <?php if ( function_exists('yoast_breadcrumb') ) { yoast_breadcrumb( '<p id="breadcrumbs">','</p>' ); } ?>
                                        </div>
                                        <h2><?php the_title(); ?></h2>
                                        <p class="desc">
                                            Nếu quý khách hàng có nhu cầu muốn mua hàng, vui lòng liên hệ số điện thoại <a href="tel:0784 180 486">0784 180 486</a> hoặc <a href="tel:0906 302 897">0906 302 897</a> để được tư vấn.
                                        </p>
                                        <div class="buy">
                                            <div class="pl-btn">
                                                <a href="/lien-he">Liên hệ</a>
                                            </div>
                                        </div>
                                        <div class="product-cat mb-2">
                                            <?php
                                                $product_terms = get_the_terms($post->ID, 'danh-muc-san-pham');
                                            ?>
                                            Danh mục:
                                            <?php foreach( $product_terms as $product_term ) : ?>
                                                <a href="<?php echo get_term_link( $product_term ); ?>"><?php echo $product_term->name; ?></a>
                                            <?php endforeach; ?>
                                        </div>
                                        <div class="action">
                                            <a class="share-fb d-inline-block" href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>&t=<?php the_title(); ?>" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;" target="_blank" title="Share on Facebook">
                                            <i class="fab fa-facebook"></i> Chia sẻ
                                        </a>
                                        </div>
                                    </div>
                                </div>

                                <div class="tintuc-related mt-4">
                                    <h2 class="st-heading"><a>Mô tả</a></h2>
                                </div>
                                <div class="entry-content">
                                    <?php the_content(); ?>
                                </div>
                                <div class="meta-data justify-content-end">
                                    <div class="right">
                                        <a href="mailto:?subject=<?php the_title(); ?>&amp;body=<?php the_permalink(); ?>" title="Share by Email">
                                            <i class="fas fa-envelope"></i> Gửi email
                                        </a>
                                        <a href="javascript:;" onclick="window.print()">
                                            <i class="fas fa-print"></i> In trang
                                        </a>
                                    </div>
                                </div>
                                <?php
                                $post_tags = get_the_tags();
                                if ($post_tags) : 
                                ?>
                                <div class="tags d-flex flex-wrap align-items-center">
                                    <div class="label">
                                        <i class="fas fa-tags"></i> TAGS:
                                    </div>
                                    <div class="tag-list">
                                        <?php foreach($post_tags as $post_tag) : ?>
                                        <a class="tag" href="<?php echo get_tag_link( $post_tag->term_id ); ?>"><?php echo $post_tag->name; ?></a>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                                <?php endif; ?>
                            </div>

                            <div class="tintuc-main-listing mb-0">
                                <h5>Sản phẩm khác</h5>
                                <?php
                                    $args = array(
                                        'post_type' => 'san-pham',
                                        'posts_per_page' => 4,
                                        'orderby' => 'rand',
                                        'order' => 'DESC',
                                        'post__not_in' => array( get_the_ID() )
                                    );
                                    $myposts = get_posts( $args );
                                    foreach ( $myposts as $post ) : setup_postdata( $post );
                                ?>
                                <article>
                                    <div class="image-box position-relative animate-box">
                                        <a href="<?php the_permalink(); ?>">
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
                                <?php endforeach; wp_reset_postdata(); ?>
                                <div class="actions text-center">
                                    <div class="pl-btn">
                                        <a href="/san-pham" class="btn-access text-uppercase d-inline-block">
                                            Xem thêm <i class="far fa-arrow-right ms-2"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-xl-4">
                            <?php get_template_part( 'templates/block/product', 'sidebar' ); ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    </main>

<?php get_footer(); ?>