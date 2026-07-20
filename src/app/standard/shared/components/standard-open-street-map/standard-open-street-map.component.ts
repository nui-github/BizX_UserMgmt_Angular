import { Component, Input, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import L, * as Leaflet from 'leaflet';
import 'leaflet-routing-machine';


@Component({
  selector: 'app-standard-open-street-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './standard-open-street-map.component.html',
  styleUrl: './standard-open-street-map.component.scss',
})
export class StandardOpenStreetMapComponent implements OnInit {

  @Input() public datasources!: IStandardDatasourceOpenStreetMap[];
  @Input() public zoom?: number = 16;
  @Input() public centerView: [number, number] = [14.012897122905052, 100.73599962049923];
  @Input() public needFitBound: boolean = true;

  private popupOption = {
    "closeButton":false
  }

  private map!: L.Map;
  private defaultIcon!: L.Icon;

  constructor() {
    this.defaultIcon = L.icon(<Leaflet.IconOptions>{
      iconUrl: "./assets/images/zoo.png",
      iconSize: [40,40]
    })
  }


  ngOnInit(): void {
    // let map = L.map('map').setView([51.505, -0.09], 13);
    this.map = L.map('map').setView(this.centerView, this.zoom);    

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 21,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    let imageUrl = './assets/images/zoomap3.png';
    let errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
    let altText = 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.';
    let latLngBounds = L.latLngBounds([
      [14.018329827003313, 100.73482527848999],
      [14.01886546380582, 100.73633640830813],
      [14.019477944954003, 100.73793841921646],
      [14.019902597590411, 100.73795149012058],
      [14.006846393733525, 100.73758734425614],
      [14.005515704933337, 100.73341266407171],
    ]);

    var start = L.latLng(14.01998442439353, 100.73375949690177);
    var end = L.latLng(14.019620311005252, 100.73740519608978);

    L.Routing.control({
      waypoints: [
          start,
          end
      ],
      routeWhileDragging: true,
      
  }).addTo(this.map);

    let imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
      opacity:0.7,
      errorOverlayUrl: errorOverlayUrl,
      alt: altText,
      interactive: true
    }).addTo(this.map);

    if(this.needFitBound) {
      this.map.fitBounds(latLngBounds);  
    }

    L.polygon([
      [14.018329827003313, 100.73482527848999],
      [14.01886546380582, 100.73633640830813],
      [14.019477944954003, 100.73653841921646],
      [14.019902597590411, 100.73785149012058],
      [14.006846393733525, 100.73758734425614],
      [14.005515704933337, 100.73341266407171],
    ],<Leaflet.PolylineOptions> {
        fillOpacity: 0,
        color: "#000000"
      
    }).addTo(this.map);

    let datasources: IStandardDatasourceOpenStreetMap[] = [
      {
        lat: "14.018246212076502",
        lng: "100.73734230072722",
        title: "อาคารเฉลิมพระเกียรติ",
        description: "อาคารสำหรับจัดประชุมหรือนิทรรศการ",
        isHeader: true,
        isActive: true,
      },
      {
        lat: "14.016397113509234",
        lng: "100.73520944874497",
        title: "อาคารศูนย์อาหาร",
        description: "อาคารสำหรับรับประทานอาหาร",
        isHeader: true,
        isActive: true,
      },
      {
        lat: "14.01423704660097",
        lng: "100.73528987691174",
        title: "โซนเอเชีย",
        description: "Asia Zone",
        isHeader: true,
        isActive: true,
      }
    ]

    this.fetchData(datasources);
  }

  public fetchData(datasources: IStandardDatasourceOpenStreetMap[]) {
    if(datasources && datasources.length > 0) {
      datasources.forEach(datasource => {
        L.marker([Number(datasource.lat), Number(datasource.lng)])
          .setIcon(this.defaultIcon)
          .addTo(this.map)
          .on("mouseover",event =>{
            event.target.bindPopup(`<b>${datasource.title}</b><br>${datasource.description}`, this.popupOption).openPopup();
          })
          .on("mouseout", event => {
            event.target.closePopup();
          });
      })
    }
  }
}

export class IStandardDatasourceOpenStreetMap {
  public lat!: string;
  public lng!: string;
  public title!: string;
  public description!: string;
  public isActive!: boolean;
  public isHeader!: boolean;
}
