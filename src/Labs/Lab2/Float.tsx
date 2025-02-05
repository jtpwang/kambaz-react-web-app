import "./index.css"; 

export default function Float() {
  return (
    <div id="wd-float-divs">
      <h2>Float</h2>

      {/* Floating Images with Text Wrapping */}
      <div>
        <img
          className="wd-float-right"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          alt="Starship"
        />
        <p>
          Lorem ipsum dolor siem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem ipt amet consectetur adipiscing elit. Eius hic ... Lorem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem ipsum dem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem ipem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem ipem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem ipem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem ip olor sit amet consectetur adipiscing elit. Eius hic ...
        </p>

        <img
          className="wd-float-left"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          alt="Starship"
        />
        <p>
          Lorem ipsum dolor sem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem ipit amet consecteem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem ipem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem ipem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem ipem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem ipem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem iptur adipiscing elit. Eius hic ... Lorem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ...
        </p>

        <img
          className="wd-float-right"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          alt="Starship"
        />
        <p>
          Lorem ipsum dolor sitem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem ip amet conseem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem ipem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem ipem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem ipem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem ipem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem ipctetur adipiscing elit. Eius hic ... Lorem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ... Lorem ipsum dolor sit amet consectetur adipiscing elit. Eius hic ...
        </p>

        <div className="wd-float-done"></div>
      </div>

      {/* Floating Horizontal Content */}
      <div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-yellow">Yellow</div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-blue wd-fg-color-white">Blue</div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-red">Red</div>

        <img
          className="wd-float-right"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          alt="Starship"
        />
        
        <div className="wd-float-done"></div>
      </div>
    </div>
  );
}
