import $ from "jquery";
import moment from "moment";
import Swal from "sweetalert2";
import "../component/hero.js";
import image from "../img/empty.svg";
const hero = $("#hero");
const keyword = $("#keyword");
const mainPage = $("#main");

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
			showMovieList(movieList);
		},
		error: () => showErrorMessage(),
	});

	$("#searchForm").on("submit", (event) => {
		event.preventDefault();
		$.ajax({
			url: `https://api.themoviedb.org/3/search/movie?api_key=a3d88eeb5f330c5238138a8a41be581e&language=en-US&query=${keyword.val()}&page=1&include_adult=false`,
			success: (result) => {
				if ($.isEmptyObject(result.results)) {
					mainPage.html("");
					console.log("Not Found");
					hero.remove();
					$("#movieList").html("");
					mainPage.append(`
					<section>
						<div class="text-center p-3 d-flex">
							<h3 class="section-title">Empty result for :<span class="keyword"> ${keyword.val()}</span></h3>
						</div>
					<div class="row py-5">
						<div class="col-12 d-flex">
							<img src=${image} class="img-fluid mx-auto"/>
						</div>
					</div>
					</section>
					`);
				} else {
					const searchResult = result.results;
					console.log("search succes");
					mainPage.html(`
					<section>	
						<div class="text-center p-3 d-flex">
						<h3 class="section-title">Search results for:<span class="keyword"> ${keyword.val()}</span></h3>
						</div>						
						<div class="row px-4 justify-content-center movie-list"
							id="movieList"
						></div>
					</section>
					`);
					showMovieList(searchResult);
				}
			},
			error: () => {
				showErrorMessage();
			},
		});
	});

	const showMovieList = (movies) => {
		$("#movieList").html("");
		$.each(movies, (i, movie) => {
			const imgPath = "https://image.tmdb.org/t/p/original";
			const dateConverted = moment(movie.release_date, "YYYY-MM-DD").format(
				"LL"
			);
			$("#movieList").append(`
						<div class="d-flex flex-column col-lg-4 movie-item">
							<div class="card h-100 movie_card">
								<img
									src="${imgPath}${movie.backdrop_path}"
									class="card-img-top img-fluid"
									alt="Movie poster unavaible "
								/>
							<div class="card-body">
									<h5 class="card-title">${movie.title}</h5>
									<p class="card-text">
											${movie.overview}
									</p>
							</div>
							<div class="card-bottom px-3 float-start ">
							<div class="movie_info">Release Date :<b> ${dateConverted}</b></div>
							<div class="movie_info" >Rating : <b>${movie.vote_average}/10</b></div>
							</div>
							</div>
						</div>`);
		});
	};

	const showErrorMessage = (
		message = `Could not connect to server,
		 please check your internet connection and try again.`
	) => {
		Swal.fire({
			title: "Error!",
			text: message,
			icon: "error",
			confirmButtonText: "Ok",
			background: "#D9D9D9",
			color: "#353535",
			confirmButtonColor: "#284b63",
		});
	};
};

export default main;
