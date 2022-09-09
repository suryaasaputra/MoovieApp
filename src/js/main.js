import $ from "jquery";
import moment from "moment";
import "../component/hero.js";
const hero = $("#hero");
const keyword = $("#keyword");
const caption = $(".section-title");

const main = () => {
	const $loading = $("#loadingDiv").hide();
	$(document)
		.ajaxStart(function () {
			$loading.show();
		})
		.ajaxStop(function () {
			$loading.hide();
		});
	$.ajax({
		url: "https://api.themoviedb.org/3/trending/movie/week?api_key=a3d88eeb5f330c5238138a8a41be581e",
		success: function (result) {
			const movieList = result.results;

			$.each(movieList, (num, movie) => {
				const imgPath = "https://image.tmdb.org/t/p/original";
				const dateConverted = moment(movie.release_date, "YYYY-MM-DD").format(
					"LL"
				);
				$("#movieList").append(`
					<div class="col-lg-4 movie-item">
						<div class="card movie_card">
							<img
								src="${imgPath}${movie.backdrop_path}"
								class="card-img-top img-fluid"
								alt="..."
							/>
						<div class="card-body">
								<h5 class="card-title">${movie.title}</h5>
								<p class="card-text">
										${movie.overview}
								</p>
								<span class="movie_info">Release Date :<b> ${dateConverted}</b></span>
								<span class="movie_info float-end" >Rate: <b>${movie.vote_average}/10</b></span>
						</div>
						</div>
					</div>`);
			});
		},
	});

	$("#searchForm").on("submit", (event) => {
		event.preventDefault();
		$.ajax({
			url: `https://api.themoviedb.org/3/search/movie?api_key=a3d88eeb5f330c5238138a8a41be581e&language=en-US&query=${keyword.val()}&page=1&include_adult=false`,
			success: (result) => {
				hero.remove();
				caption.text(`Hasil Pencarian ${keyword.val()}`);
				$("#movieList").html("");
				const searchResult = result.results;
				$.each(searchResult, (num, movie) => {
					const imgPath = "https://image.tmdb.org/t/p/original";
					const dateConverted = moment(movie.release_date, "YYYY-MM-DD").format(
						"LL"
					);
					$("#movieList").append(`
					<div class="col-lg-4 movie-item">
						<div class="card movie_card">
							<img
								src="${imgPath}${movie.backdrop_path}"
								class="card-img-top img-fluid"
								alt="..."
							/>
						<div class="card-body">
								<h5 class="card-title">${movie.title}</h5>
								<p class="card-text">
										${movie.overview}
								</p>
								<span class="movie_info">Release Date :<b> ${dateConverted}</b></span>
								<span class="movie_info float-end" >Rate: <b>${movie.vote_average}/10</b></span>
								
						</div>
						</div>
					</div>`);
				});
			},
		});
	});
};

export default main;