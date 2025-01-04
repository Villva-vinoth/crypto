import React, { useEffect,  useState } from 'react';

function BookingWidget() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = "//widget.simplybook.me/v2/widget/widget.js";
        script.onload = () => {
            new SimplybookWidget({
                "widget_type": "iframe",
                "url": "https://vv12.simplybook.me",
                "theme": "inspiration",
                "theme_settings": {
                    "timeline_show_end_time": "0",
                    "timeline_modern_display": "as_slots",
                    "img_fit_mode": "1",
                    "timeline_hide_unavailable": "1",
                    "hide_past_days": "0",
                    "sb_base_color": "#000000",
                    "display_item_mode": "block",
                    "booking_nav_bg_color": "#ba1480",
                    "body_bg_color": "#ffffff",
                    "sb_review_image": "",
                    "dark_font_color": "#474747",
                    "light_font_color": "#ffffff",
                    "btn_color_1": "#bfb3a8",
                    "sb_company_label_color": "#2b1b40",
                    "hide_img_mode": "1",
                    "show_sidebar": "1",
                    "sb_busy": "#c7b3b3",
                    "sb_available": "#d6ebff"
                },
                "timeline": "modern_week",
                "datepicker": "inline_datepicker",
                "is_rtl": false,
                "app_config": {
                    "clear_session": 1,
                    "allow_switch_to_ada": 1,
                    "predefined": []
                },
                "container_id": "sbw_1ys1go"
            });

            // Hide the loading indicator once the widget is initialized
          
        };
        document.head.appendChild(script);
        const timer = setTimeout(()=>{
            setIsLoading(false);
        },5000)
        return () => {
            document.head.removeChild(script);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div>
            <h2>Book an Appointment</h2>
            {isLoading && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>Loading widget...</p>
                    <div
                        style={{
                            width: '50px',
                            height: '50px',
                            border: '5px solid #f3f3f3',
                            borderTop: '5px solid #3498db',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto'
                        }}
                    ></div>
                </div>
            )}
            <div id="sbw_1ys1go" style={{ display: isLoading ? 'none' : 'block' }}></div>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default BookingWidget;
