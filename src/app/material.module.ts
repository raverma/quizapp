import { ModuleWithProviders, NgModule} from "@angular/core";
import { MatInputModule} from "@angular/material/input";
import { MatCardModule} from "@angular/material/card";
import { MatButtonModule} from "@angular/material/button";
import { MatToolbarModule} from "@angular/material/toolbar";
import { MatExpansionModule} from "@angular/material/expansion";
import { MatPaginatorModule} from "@angular/material/paginator";
import { MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { MatDialogModule} from "@angular/material/dialog";
import { MatIconRegistry } from '@angular/material/icon';


@NgModule({
    imports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatDialogModule

    ],
    exports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatDialogModule
    ],
    providers: [     
    ]

})

export class MaterialModule {
    static forRoot(): ModuleWithProviders<MaterialModule> {
        return {
            ngModule: MaterialModule,
            providers: [MatIconRegistry]
        };
    }
}
