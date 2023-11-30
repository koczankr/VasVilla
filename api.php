<?php
header("Content-Type: application/json");

$series = array(
    array("title" => "Breaking Bad", "rating" => 9.5, "genre" => "Dráma"),
    array("title" => "Stranger Things", "rating" => 8.7, "genre" => "Sci-fi, Horror, Thriller"),
    array("title" => "The Crown", "rating" => 8.6, "genre" => "Történelmi, Dráma"),
    array("title" => "Black Mirror", "rating" => 8.8, "genre" => "Sci-fi, Antológia"),
    array("title" => "The Mandalorian", "rating" => 8.8, "genre" => "Sci-fi, Akció, Kaland"),
    array("title" => "Fleabag", "rating" => 8.7, "genre" => "Vígjáték, Dráma"),
    array("title" => "Mindhunter", "rating" => 8.6, "genre" => "Bűnügyi, Dráma, Thriller"),
    array("title" => "Chernobyl", "rating" => 9.4, "genre" => "Dokumentum, Dráma, Történelmi"),
    array("title" => "Game of Thrones", "rating" => 9.3, "genre" => "Fantasy, Dráma, Kaland"),
    array("title" => "The Witcher", "rating" => 8.2, "genre" => "Akció, Kaland, Fantasy"),
    array("title" => "Narcos", "rating" => 8.8, "genre" => "Bűnügyi, Dráma, Thriller"),
    array("title" => "The Office", "rating" => 8.9, "genre" => "Vígjáték"),
    array("title" => "Sherlock", "rating" => 9.1, "genre" => "Bűnügyi, Dráma, Misztikus"),
    array("title" => "The Simpsons", "rating" => 8.7, "genre" => "Animáció, Vígjáték"),
    array("title" => "Friends", "rating" => 8.9, "genre" => "Vígjáték, Romantikus"),
    array("title" => "Westworld", "rating" => 8.6, "genre" => "Dráma, Sci-fi, Western"),
    array("title" => "Stranger Things", "rating" => 8.7, "genre" => "Sci-fi, Horror, Thriller"),
    array("title" => "Money Heist", "rating" => 8.3, "genre" => "Akció, Bűnügyi, Dráma"),
    array("title" => "The Big Bang Theory", "rating" => 8.1, "genre" => "Vígjáték"),
    array("title" => "Ozark", "rating" => 8.4, "genre" => "Bűnügyi, Dráma, Thriller"),
    array("title" => "The Umbrella Academy", "rating" => 8.0, "genre" => "Akció, Dráma, Fantasy"),
    array("title" => "The Sopranos", "rating" => 9.2, "genre" => "Bűnügyi, Dráma"),
    array("title" => "Fargo", "rating" => 8.9, "genre" => "Bűnügyi, Dráma, Thriller"),
    array("title" => "Rick and Morty", "rating" => 9.2, "genre" => "Animáció, Kaland, Sci-fi"),
    array("title" => "The Haunting of Hill House", "rating" => 8.6, "genre" => "Dráma, Horror, Misztikus"),
    array("title" => "Daredevil", "rating" => 8.6, "genre" => "Akció, Bűnügyi, Dráma"),
    array("title" => "Black Panther", "rating" => 9.0, "genre" => "Akció, Kaland, Sci-fi"),
    array("title" => "The Boys", "rating" => 8.7, "genre" => "Akció, Dráma, Sci-fi"),
    array("title" => "Breaking Bad", "rating" => 9.5, "genre" => "Dráma"),
    array("title" => "BoJack Horseman", "rating" => 8.7, "genre" => "Animáció, Dráma, Vígjáték"),
    array("title" => "The Witcher", "rating" => 8.2, "genre" => "Akció, Kaland, Fantasy")
);
//print_r (series);

// ha van list paraméter a GET metódusban, de nincs értéke (http://localhost/myapi/api.php?list), akkor visszatérünk az összes sorozattal
if (isset($_GET['list']) && htmlspecialchars($_GET['list'] == 0)) {

    echo json_encode($series);

// ha van list paraméter a GET metódusban, és van értéke (http://localhost/myapi/api.php?list=3), akkor visszatérünk a sorozattal
} elseif (isset($_GET['list']) && htmlspecialchars($_GET['list'] >= 0)) {

    $seriesId = htmlspecialchars($_GET['list']);

    if (isset($series[$seriesId])) {
        echo json_encode($series[$seriesId]);
    } else {
        echo json_encode(array("error" => "Sorozat nem található"));
    }

// sorozatkatgeoriak http://localhost/myapi/api.php?categories
} elseif (isset($_GET['categories'])) {
    $allGenres = array();
    foreach ($series as $item) {
        $genres = explode(", ", $item['genre']);
        $allGenres = array_merge($allGenres, $genres);
    }
    $uniqueGenres = array_unique($allGenres);
    echo json_encode($uniqueGenres);

// szűrés kategóriára http://localhost/myapi/api.php?category=Kaland
/*} elseif (isset($_GET['category']) && htmlspecialchars($_GET['category'] >= 0)) {
    $selectedCategory = htmlspecialchars($_GET['category']);
    $filteredSeries = array_filter($series, function ($item) use ($selectedCategory) {
        $genres = explode(", ", $item['genre']);
        return in_array($selectedCategory, $genres);
    });
    echo json_encode($filteredSeries);
*/

// ha a kategóriára szűrést kéri
} elseif (isset($_GET['category']) && htmlspecialchars($_GET['category'] >= 0)) {
    $selectedCategory = htmlspecialchars($_GET['category']);
    
    // Ellenőrizze, hogy a kategória létezik-e
    $allGenres = array();
    foreach ($series as $item) {
        $genres = explode(", ", $item['genre']);
        $allGenres = array_merge($allGenres, $genres);
    }
    $uniqueGenres = array_unique($allGenres);

    if (!in_array($selectedCategory, $uniqueGenres)) {
        echo json_encode(array("error" => "Érvénytelen kategória név"));
        exit;
    }

    // Szűrje a sorozatokat a kiválasztott kategóriára
    $filteredSeries = array_filter($series, function ($item) use ($selectedCategory) {
        $genres = explode(", ", $item['genre']);
        return in_array($selectedCategory, $genres);
    });

    echo json_encode($filteredSeries);

// ha a TOP3 legnézettebb sorozatokat kéri
} elseif (isset($_GET['top3'])) {
    $sortedSeries = array_slice($series, 0);
    uasort($sortedSeries, function ($a, $b) {
        return $b['rating'] > $a['rating'] ? 1 : ($b['rating'] < $a['rating'] ? -1 : 0);
    });
    $top3Series = array_slice($sortedSeries, 0, 3);
    echo json_encode($top3Series);

// ha nem volt érvényes az endpoint:
} else {

    echo json_encode("Hello Sorozatfan! Érvényes URL-t használj!");

}



?>
