<?php /* Template Name: Trang chủ */ ?>

<?php get_header(); ?>

<main>

    <section class="hp-banner">
        <div class="owl-carousel" data-autoheight="true" data-desktop="1" data-desktop-small="1" data-tablet="1"
            data-mobile="1" data-nav="true" data-margintb="0" data-dots="false" data-loop="true" data-autoplay="true"
            data-speed="500" data-autotime="4000">
            <div class="owl-carousel-item">
                <img src="<?php bloginfo('template_url'); ?>/assets/images/banner.jpeg" alt="banner" />
            </div>
            <div class="owl-carousel-item">
                <img src="<?php bloginfo('template_url'); ?>/assets/images/banner2.jpeg" alt="banner" />
            </div>
            <div class="owl-carousel-item">
                <img src="<?php bloginfo('template_url'); ?>/assets/images/banner3.jpeg" alt="banner" />
            </div>
        </div>
        <div class="hp-banner-content">
            <h1 class="banner-title" data-aos="fade-down" data-aos-duration="1000" data-aos-delay="200">
                CÔNG TY TNHH SẮT THÉP<br>
                <span>QUANG HUY PHÁT</span>
            </h1>
            <p class="desc" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">Đại lý cung cấp sắt
                thép xây dựng tốt nhất
                hiện nay cho hơn 500+ công trình lớn nhỏ
            </p>
            <a class="baogia" href="/lien-he" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                Liên hệ
            </a>
        </div>
    </section>
    <section class="vue">
        <div id="root"></div>
    </section>
    <section class="hp-about">
        <div class="container">
            <div class="hp-about-wrap">
                <div class="col-left" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
                    <h3>
                        Công ty TNHH Sắt Thép
                        <span>QUANG HUY PHÁT</span>
                    </h3>
                    <div class="desc">
                        <p>
                            Sắt thép Quang Huy Phát là địa chỉ cung cấp các loại thép hộp, thép hình, thép tấm,
                            tôn
                            lợp,
                            lưới B40 và các loại dây thép,… tốt nhất hiện nay. 100% sản phẩm của Đại lý Sắt thép
                            MTP
                            được sản xuất bởi các thương hiệu thép nổi tiếng như: Thép Hoa Sen, Thép Hòa Phát,
                            Thép
                            Việt
                            Nhật, Thép Posco ss Vina, Thép Hàn Quốc, Thép Trung Quốc, Thép Nhật Bản,…
                        </p>
                        <p>
                            Trong suốt những năm qua, chúng tôi không ngừng phấn đấu, xây dựng và
                            trưởng thành, trở thành một trong những đơn vị tiên phong cung cấp các mặt hàng sắt
                            thép
                            có
                            uy tín trên thị trường.
                        </p>
                    </div>
                    <div class="pl-btn">
                        <a href="#">Xem thêm</a>
                    </div>
                </div>
                <div class="col-right" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
                    <div class="image">
                        <img src="<?php bloginfo('template_url'); ?>/assets/images/about.jpeg" alt="giới thiệu">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="hp-product">
        <div class="container">
            <div class="section-title" data-aos="fade-down" data-aos-duration="1000" data-aos-delay="200">
                <h2>SẢN PHẨM CỦA CHÚNG TÔI</h2>
                <p>Chúng tôi luôn nỗ lực để mang đến bạn hàng hóa với giá cả và dịch vụ tốt nhất</p>
            </div>
            <div class="product-listing" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                <div class="row">
                    <?php
                    $args = array(
                        'post_type' => 'san-pham',
                        'posts_per_page' => 6,
                        'orderby' => 'date',
                        'order' => 'DESC',
                    );
                    $getposts = new WP_Query($args);
                    while ($getposts->have_posts()) : $getposts->the_post();
                    ?>
                    <div class="col-md-6 col-lg-4">
                        <a class="product-item" href="<?php the_permalink(); ?>">
                            <div class="img">
                                <img src="<?php the_post_thumbnail_url('full'); ?>" alt="<?php the_title(); ?>">
                            </div>
                            <div class="content">
                                <h3><?php the_title(); ?></h3>
                                <div class="date"><i class="far fa-calendar-alt"></i>
                                    <?php echo get_the_date('d/m/Y'); ?></div>
                                <p class="desc line-3">
                                    <?php echo wp_trim_words(get_the_content(), $num_words = 50, $more = null); ?></p>
                            </div>
                        </a>
                    </div>
                    <?php endwhile;
                    wp_reset_postdata(); ?>
                </div>
                <div class="pl-btn text-center">
                    <a href="<?php echo get_home_url(); ?>/san-pham">Xem thêm</a>
                </div>
            </div>
        </div>
    </section>

    <section class="hp-contact">
        <div class="container">
            <div class="section-title" data-aos="fade-down" data-aos-duration="1000" data-aos-delay="200">
                <h2>NHẬN BÁO GIÁ HÔM NAY</h2>
                <p class="text-white">Điền thông tin vào form dưới đây để nhận yêu cầu báo giá sản phẩm từ chúng
                    tôi</p>
            </div>

            <div class="form-wrap" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                <?php echo do_shortcode('[contact-form-7 id="60" title="Form liên hệ"]'); ?>
            </div>
        </div>
    </section>

    <section class="hp-blog">
        <div class="container">
            <div class="row">
                <div class="col-lg-5" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
                    <h2>Tin tức mới</h2>
                    <ul class="list-blog list-unstyled">
                        <?php
                        $args = array(
                            'posts_per_page' => 3,
                            'orderby' => 'date',
                            'order' => 'DESC',
                            'cat' => 1,
                        );
                        $getposts = new WP_Query($args);
                        while ($getposts->have_posts()) : $getposts->the_post();
                        ?>
                        <li>
                            <div class="thumb">
                                <a href="<?php the_permalink(); ?>"><img src="<?php the_post_thumbnail_url('full'); ?>"
                                        alt="<?php the_title(); ?>"></a>
                            </div>
                            <div class="content">
                                <a class="line-2" href="<?php the_permalink(); ?>"
                                    class="line-3"><?php the_title(); ?></a>
                                <div class="date">
                                    <i class="far fa-calendar-alt"></i> <?php echo get_the_date('d/m/Y'); ?>
                                </div>
                            </div>
                        </li>
                        <?php endwhile;
                        wp_reset_postdata(); ?>
                        <div class="bottom text-center">
                            <a href="/tin-tuc">Xem thêm</a>
                        </div>
                    </ul>
                </div>
                <div class="col-lg-7" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
                    <h2>Thông tin khuyến mãi</h2>
                    <ul class="list-promotion list-unstyled mb-0">
                        <?php
                        $args = array(
                            'posts_per_page' => 2,
                            'orderby' => 'date',
                            'order' => 'DESC',
                            'cat' => 7,
                        );
                        $getposts = new WP_Query($args);
                        while ($getposts->have_posts()) : $getposts->the_post();
                        ?>
                        <li>
                            <div class="thumb">
                                <a href="<?php the_permalink(); ?>"><img src="<?php the_post_thumbnail_url('full'); ?>"
                                        alt="<?php the_title(); ?>"></a>
                            </div>
                            <div class="content">
                                <div class="title"><a class="line-1"
                                        href="<?php the_permalink(); ?>"><?php the_title(); ?></a></div>
                                <div class="line-3">
                                    <?php echo wp_trim_words(get_the_content(), $num_words = 50, $more = null); ?></div>
                            </div>
                        </li>
                        <?php endwhile;
                        wp_reset_postdata(); ?>
                        <div class="bottom text-center">
                            <a href="/khuyen-mai">Xem thêm</a>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section class="hp-brand">
        <div class="container">
            <div class="section-title" data-aos="fade-down" data-aos-duration="1000" data-aos-delay="200">
                <h2>THƯƠNG HIỆU</h2>
            </div>
            <div class="carousel-wrap" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                <div class="owl-carousel" data-autoheight="true" data-desktop="4" data-desktop-small="4" data-tablet="3"
                    data-mobile="2" data-nav="false" data-margintb="20" data-dots="false" data-loop="true"
                    data-autoplay="true" data-speed="500" data-autotime="4000">
                    <div class="owl-carousel-item">
                        <img src="<?php bloginfo('template_url'); ?>/assets/images/brand1.jpeg" alt="Thép Hoà Phát" />
                    </div>
                    <div class="owl-carousel-item">
                        <img src="<?php bloginfo('template_url'); ?>/assets/images/brand2.png" alt="Thép Miền Nam" />
                    </div>
                    <div class="owl-carousel-item">
                        <img src="<?php bloginfo('template_url'); ?>/assets/images/brand3.jpeg" alt="Thép Pomina" />
                    </div>
                    <div class="owl-carousel-item">
                        <img src="<?php bloginfo('template_url'); ?>/assets/images/brand4.jpeg" alt="Thép Tây Đô" />
                    </div>
                    <div class="owl-carousel-item">
                        <img src="<?php bloginfo('template_url'); ?>/assets/images/brand5.jpeg" alt="VAS" />
                    </div>
                </div>
            </div>
        </div>
    </section>

</main>

<?php get_footer(); ?>