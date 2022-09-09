import img from "../img/hero.svg";

class AppHero extends HTMLElement {
	connectedCallback() {
		this.render();
	}
	render() {
		this.innerHTML = `
        <section class="hero" id="hero">
				<div class="container py-5">
					<div class="row">
						<div class="col-lg-5 align-self-center text-center">
							<h2 class="hero-title">Find Best Movie Recomendation</h2>
							<p>Did you know watching movie could boost your mental health, relieve stress, and foster relationships? </p>
							<!-- <button type="button" class="buton-primary p-2">
								Find Movies
							</button> -->
						</div>
						<div class="col-lg-7">
							<div class="image-banner">
								<img src=${img} class="img-fluid"/>
							</div>
						</div>
					</div>
				</div>
			</section>
    `;
	}
}

customElements.define("app-hero", AppHero);
