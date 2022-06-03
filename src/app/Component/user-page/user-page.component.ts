import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/Interfaces/IUser';
import { FilmsService } from 'src/app/services/films.service';
import { USERS } from 'src/assets/user';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  arrayUsers: IUser[] = USERS;
  userLogFlag:any = localStorage.getItem('userLogFlag')
  user:any
  wishList = [
    {
      adult: false,
      backdrop_path: "/kB1Qrsg189eDz4Ej3ABXtLudClq.jpg",
      genre_ids: [
            35
        ],
      id: 810171,
      original_language: "en",
      original_title: "The Valet",
      overview: "World famous movie star Olivia faces a PR disaster when a paparazzi snaps a photo of her with her married lover, Vincent. The hard-working valet Antonio accidentally appears in the same photo and is enlisted to pose as Olivia’s new boyfriend as a cover-up. This ruse with Olivia thrusts Antonio into the spotlight and unexpected chaos.",
      popularity: 1252.269,
      poster_path: "/q7FmdJHKMLIC4XgWfcFRIu2iVdL.jpg",
      release_date: "2022-05-11",
      title: "The Valet",
      video: false,
      vote_average: 7.9,
      vote_count: 134
    },
    {
      adult: false,
      backdrop_path: "/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg",
      genre_ids: [
            28,
            18
        ],
      id: 361743,
      original_language: "en",
      original_title: "Top Gun: Maverick",
      overview: "After more than thirty years of service as one of the Navy’s top aviators, and dodging the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen. Facing an uncertain future and confronting the ghosts of his past, Maverick is drawn into a confrontation with his own deepest fears, culminating in a mission that demands the ultimate sacrifice from those who will be chosen to fly it.",
      popularity: 1127.958,
      poster_path: "/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
      release_date: "2022-05-24",
      title: "Top Gun: Maverick",
      video: false,
      vote_average: 8.3,
      vote_count: 555
    },
    {
      adult: false,
      backdrop_path: "/i0zbSmiyyylh7H3Qb4jgscz46Pm.jpg",
      genre_ids: [
            27
        ],
      id: 893370,
      original_language: "es",
      original_title: "Virus-32",
      overview: "A virus is unleashed and a chilling massacre runs through the streets of Montevideo.",
      popularity: 1130.998,
      poster_path: "/wZiF79hbhLK1U2Pj9bF67NAKXQR.jpg",
      release_date: "2022-04-21",
      title: "Virus:32",
      video: false,
      vote_average: 7.2,
      vote_count: 69
    },
    {
      adult: false,
      backdrop_path: "/jIdZmqElYgNwlCsUtCwmN1rDu7I.jpg",
      genre_ids: [
            80,
            18,
            53
        ],
      id: 799876,
      original_language: "en",
      original_title: "The Outfit",
      overview: "Leonard is an English tailor who used to craft suits on London’s world-famous Savile Row. After a personal tragedy, he’s ended up in Chicago, operating a small tailor shop in a rough part of town where he makes beautiful clothes for the only people around who can afford them: a family of vicious gangsters.",
      popularity: 1018.928,
      poster_path: "/lZa5EB6PVJBT5mxhgZS5ftqdAm6.jpg",
      release_date: "2022-02-25",
      title: "The Outfit",
      video: false,
      vote_average: 7.1,
      vote_count: 251
    },
    {
      adult: false,
      backdrop_path: "/eQN31P4IEhyp6NkdccvppJnyuJ4.jpg",
      genre_ids: [
            28,
            12,
            14,
            878
        ],
      id: 284052,
      original_language: "en",
      original_title: "Doctor Strange",
      overview: "After his career is destroyed, a brilliant but arrogant surgeon gets a new lease on life when a sorcerer takes him under her wing and trains him to defend the world against evil.",
      popularity: 1075.719,
      poster_path: "/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg",
      release_date: "2016-10-25",
      title: "Doctor Strange",
      video: false,
      vote_average: 7.4,
      vote_count: 19087
    },
    {
      adult: false,
      backdrop_path: "/3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg",
      genre_ids: [
            16,
            35,
            10751,
            14
        ],
      id: 568124,
      original_language: "en",
      original_title: "Encanto",
      overview: "The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family with a unique gift from super strength to the power to heal—every child except one, Mirabel. But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family's last hope.",
      popularity: 918.889,
      poster_path: "/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
      release_date: "2021-11-24",
      title: "Encanto",
      video: false,
      vote_average: 7.7,
      vote_count: 6575
    },
    {
      adult: false,
      backdrop_path: "/qjGrUmKW78MCFG8PTLDBp67S27p.jpg",
      genre_ids: [
            16,
            28,
            12,
            14
        ],
      id: 635302,
      original_language: "ja",
      original_title: "劇場版「鬼滅の刃」無限列車編",
      overview: "Tanjirō Kamado, joined with Inosuke Hashibira, a boy raised by boars who wears a boar's head, and Zenitsu Agatsuma, a scared boy who reveals his true power when he sleeps, boards the Infinity Train on a new mission with the Fire Hashira, Kyōjurō Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers who oppose it!",
      popularity: 722.059,
      poster_path: "/h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg",
      release_date: "2020-10-16",
      title: "Demon Slayer -Kimetsu no Yaiba- The Movie: Mugen Train",
      video: false,
      vote_average: 8.4,
      vote_count: 2442
    },
    {
      adult: false,
      backdrop_path: "/vkjsoMF86dJIv6Sgtd4CcuR8kzh.jpg",
      genre_ids: [
            16,
            14
        ],
      id: 843241,
      original_language: "ja",
      original_title: "劇場版 七つの大罪 光に呪われし者たち",
      overview: "With the help of the \"Dragon Sin of Wrath\" Meliodas and the worst rebels in history, the Seven Deadly Sins, the \"Holy War\", in which four races, including Humans, Goddesses, Fairies and Giants fought against the Demons, is finally over. At the cost of the \"Lion Sin of Pride\" Escanor's life, the Demon King was defeated and the world regained peace. After that, each of the Sins take their own path.",
      popularity: 676.037,
      poster_path: "/k0ThmZQl5nHe4JefC2bXjqtgYp0.jpg",
      release_date: "2021-07-02",
      title: "The Seven Deadly Sins: Cursed by Light",
      video: false,
      vote_average: 7.9,
      vote_count: 345
    }
]
delete(film:any){
  this.wishList = this.wishList.filter((obj:any)=>obj.id!=film.id)
  console.log(this.wishList)
}
  constructor(    
    private route: ActivatedRoute,
) { }

  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id')
    this.user  = this.arrayUsers.filter((obj:any)=>
      obj.id==id
    )
    console.log(this.user)
  }

}
