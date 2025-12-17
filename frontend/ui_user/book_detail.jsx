import React, { useState } from "react";
import "./book_detail.css";

const relatedBooks = [
  {
    id: 1,
    title: "Don't Make Me Think",
    author: "Steve Krug",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPxXgCerM-9znn9LHzfQdy_zrZ7jPwuyQ27WMJJv7IKbHuL1aFAhIKsHrIz3D2WUIyG1OUHi3egv4FXR6MmtmbYFnTIErAYk5n5FSs8TjxLFwbLkvNyhVkivEdn6wHQL-_V075Wh9t43aaU5hYUrleLk6b_6x6spIlGWU_7nf6gi5jujqYtQ9Zmc0CMZng2EFAZuOJrNKqBK_4TYZDXd58pYLsvUXONYXrH2K4U2zrKOlhEiMBZpR10pHqgCRSTaZpCxxWPX2yJd-s"
  },
  {
    id: 2,
    title: "Universal Principles of Design",
    author: "Lidwell, Holden, Butler",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAMf1e0dGV5O70gyGnbSGx1bduXXfBNR544Rl3c-6PUFZxLSJrjvHg8lKBMumIHG-SkpzyWIPjo16KBRmu2mCuBgsfRbmSMV8_--FO_fdR0PdsvFNKXXuZ04w9F0u4hIjD2-ZjvwT_I20brDAyah76roN45FeaYHUxqwhhN6cZ-JnMTGXi8v35V8FhkWG-ppE_6xRTrJmfkcxj6uVpVwTQpTE1R1_pM0-oG8D451pPVlncGdOok__973gmL7xXfB_eWT22RbC8mND1"
  },
  {
    id: 3,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoEyRSz1YRFlSdtmW9gMBaWh6sBXMisRg_LCORz-FVw5TQFyIRNDzfe6MlBTbj88e44RT5LrYfkxOnHo_0xXU-njG3Pb162mqfGcnfl7ckiU6Y9VH6NU-cgLBYqRUEUbVcThB3dgq-APWcbNJgmOqJ1cAfS63F8qsZdHI-dyPlyO96z9XNJOvbr0UjIxmUmldgduvkjzwy_SPYwP_FULVBd-KeLjz0OnWfaIXSkyIlDwljAIxxKZIo08V59U0QJHtDdy1XhJcudADO"
  },
  {
    id: 4,
    title: "Hooked",
    author: "Nir Eyal",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuA48gOJI_9dFjJdxiN8klAZu4VGdhYohBcD5vltL4d3RRvVP6_97m2kHiSzs1IDFq1XTAap0kBTDTrUU07dYVjEvXDwZc9516bE_-ds4ins2YKjb_C3A6nQyX5knzzyP-wkPYTYewBekGZYDeM28TZ7pgTSXFAL29saWZgw7XLhbzKFu-xkS2gMg4KKxcMFTEPc4qmXGfNJ6Fln-KdNwnP7ECCZ7HFc7SKegQHmhy_IB_8WiB-bp06HSFz9EDnDhb0L6Fy0i1Q4vpV2"
  },
  {
    id: 5,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFV52URvr2C8cMg-y249iqvZrA7fXjxFHsV_j3x91NNmC0y0irkSClSY2lRrzrmoCq0LYjZYVCF0U9BQECt-9YQc5TW-wWg4UbckPZO2GjiHZpZRZmJ5gmSUEfOpAHeo6Pi2v8dTDBh9cLJFq0x6_rKZICSfDi8JqOwBu83zqFZKIpX-V108WHJ6kYo33yp28m4fQ_QjIZjxK1SRlGnKags0V2c8D8U-1M71mQOrWJq-QzZ7dFdmjfK8Yrk49gWUvg0A3k-HNCUVIC"
  }
];

const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    memberSince: "2021",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9J-jRdZyk4O98_wkMd9YFXvqk3GLhinspaMjT91mDCqJ9oXgzXn1Yxt5JklqVMXzItEYHuFHJIJv2Jce8tXXqTx5mNqA9Fd2rX7jNq3frM9WCxU3L3ZNU92a3uSAhUn2YqJWtnAcdaN6yiMo1cSgA9p_7qZoMk0jxFXPOxsYo8hRZQPMDjOCeIM6rWsvYajt6GRpLP4Na4RwJp3g-LbmZqZwJyCS5ZABswHPDEib7ckPvTqBXcvhWsQeJJw2J2RqQEhVzU4Zgs117",
    rating: 5,
    date: "2 days ago",
    text: "This book completely changed how I look at doors! A must-read for anyone interested in why things work (or don't work) the way they do."
  },
  {
    id: 2,
    name: "Marcus Chen",
    memberSince: "2023",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3KKGNTK8IiPIFIYJ_4732kWVX-MsLRVE6-gVVcEqQ3rjFNEjEC1CjJOdVdydpDkJPZaXgXxgOHNaWqQfivNq24rCvR5impiCvoeSfv2aTYC3Vt2taB9wnhNru-8F6PQxKV7ufVo7VH2nvNzn1jwmJ2vgkoVKGf8njr7W2ywgagbbC0Igcv-rKWQE651ArkhR8TWn6MyEbCtpR05jiX5QYcUaKA3H7zlOk1soKb9axNE_3Nlu9Dv0GlemodmGnOeekI-o1ctTW-My2",
    rating: 4,
    date: "1 week ago",
    text: "Great content, but gets a bit repetitive in the middle chapters. Still highly recommended for design students."
  }
];

const BookDetail = () => {
  const [activeTab, setActiveTab] = useState("description");

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star-icon filled">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star-icon half">★</span>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star-icon empty">★</span>);
    }
    return stars;
  };

  return (
    <>
      <div className="book-detail-container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs">
          <a href="#" className="breadcrumb-link">Home</a>
          <span className="breadcrumb-separator">›</span>
          <a href="#" className="breadcrumb-link">Catalog</a>
          <span className="breadcrumb-separator">›</span>
          <a href="#" className="breadcrumb-link">Design</a>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">The Design of Everyday Things</span>
        </nav>

        <div className="book-detail-grid">
          {/* Left Column: Book Cover & Actions */}
          <div className="book-showcase">
            {/* Book Cover */}
            <div className="book-cover-large">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIGV6wGWuEYh7kthwMdnxBSjX1yXhq220r30zbRASaVsDXmdHVCUKG6zsZLCw0ygtJkJ_YMNqxub294uVxCZ1BnqjFH8LBHQG9ENO_SabnSHrTS73pVg2P5eFWDQTT5eBlVMQTHpoIY9lEx9D0Hjzir_gE9h5iljYBODGq8FwnOPHPcKZZgUgZ4iZWe5amAMpKwrRDEzb7VWNwlhU4ye5RfL4DMiiNtp7bRWtX7JKcYsiDvBGXDUULaRmIXslraBmMHlfy9FH-XJYu"
                alt="Cover for The Design of Everyday Things"
                className="book-cover-image"
              />
              <div className="status-badge-overlay">
                <span className="status-badge status-available">
                  <span className="status-dot"></span>
                  Available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="btn-borrow-now">
                <span className="btn-icon">📖</span>
                Borrow Now
              </button>
              <button className="btn-wishlist">
                <span className="btn-icon">🔖</span>
                Add to Wishlist
              </button>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-label">Copies</span>
                <span className="stat-value">4</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-label">Pages</span>
                <span className="stat-value">368</span>
              </div>
            </div>
          </div>

          {/* Right Column: Book Details */}
          <div className="book-content">
            {/* Header Info */}
            <div className="book-header">
              <div className="book-categories">
                <a href="#" className="category-chip category-primary">Design</a>
                <a href="#" className="category-chip">Psychology</a>
                <a href="#" className="category-chip">Non-Fiction</a>
              </div>
              
              <h1 className="book-title">The Design of Everyday Things</h1>
              
              <div className="book-author">
                <span className="author-label">by</span>
                <a href="#" className="author-link">Don Norman</a>
              </div>

              {/* Rating */}
              <div className="book-rating-section">
                <div className="rating-stars">
                  {renderStars(4.5)}
                </div>
                <span className="rating-value">4.5</span>
                <span className="rating-separator">•</span>
                <a href="#reviews" className="rating-reviews">128 Reviews</a>
              </div>
            </div>

            {/* Tabs */}
            <div className="content-tabs">
              <button
                className={`tab-button ${activeTab === "description" ? "active" : ""}`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`tab-button ${activeTab === "details" ? "active" : ""}`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
              <button
                className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "description" && (
              <div className="tab-content">
                <div className="book-description">
                  <p>
                    Even the smartest among us can feel inept as we fail to figure out which light switch or oven burner to turn on, or whether to push, pull, or slide a door. The fault, argues this ingenious—even liberating—book, lies not in ourselves, but in product design that ignores the needs of users and the principles of cognitive psychology.
                  </p>
                  <p>
                    The problems range from ambiguous and hidden controls to arbitrary relationships between controls and functions, coupled with a lack of feedback or other assistance and unreasonable demands on memorization. <em>The Design of Everyday Things</em> shows that good, usable design is possible.
                  </p>
                </div>

                {/* Metadata Grid */}
                <div className="book-metadata">
                  <div className="metadata-item">
                    <p className="metadata-label">Publisher</p>
                    <p className="metadata-value">Basic Books</p>
                  </div>
                  <div className="metadata-item">
                    <p className="metadata-label">Published</p>
                    <p className="metadata-value">Nov 5, 2013</p>
                  </div>
                  <div className="metadata-item">
                    <p className="metadata-label">ISBN-13</p>
                    <p className="metadata-value">978-0465050659</p>
                  </div>
                  <div className="metadata-item">
                    <p className="metadata-label">Language</p>
                    <p className="metadata-value">English</p>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="reviews-section">
              <div className="reviews-header">
                <h3 className="reviews-title">Community Reviews</h3>
                <button className="btn-write-review">Write a Review</button>
              </div>

              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <img
                      src={review.avatar}
                      alt={`Avatar of ${review.name}`}
                      className="review-avatar"
                    />
                    <div className="review-content">
                      <div className="review-header-row">
                        <div>
                          <p className="review-name">{review.name}</p>
                          <p className="review-member">Member since {review.memberSince}</p>
                        </div>
                        <span className="review-date">{review.date}</span>
                      </div>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                      </div>
                      <p className="review-text">{review.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Books Section */}
        <div className="related-books-section">
          <div className="related-header">
            <h3 className="related-title">You Might Also Like</h3>
            <a href="#" className="related-link">
              View Catalog <span className="arrow-icon">→</span>
            </a>
          </div>

          <div className="related-books-grid">
            {relatedBooks.map((book) => (
              <a key={book.id} href="#" className="related-book-card">
                <div className="related-book-cover">
                  <img src={book.cover} alt={`Cover of ${book.title}`} />
                </div>
                <div className="related-book-info">
                  <h4 className="related-book-title">{book.title}</h4>
                  <p className="related-book-author">{book.author}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetail;
