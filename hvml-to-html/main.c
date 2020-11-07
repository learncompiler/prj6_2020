#include <stdio.h>

#include <hvml/hvml_dom.h>
#include <hvml/hvml_json_parser.h>

int main(int argc, char** argv[]) {

    // Error parameter
    if(argc != 2) {
        printf("Usage: ./main *.hvml\n");
        return 0;
    }

    printf("Reading hvml file...\n");
    FILE* hvml_file = fopen(argv[1], "r");
    if(hvml_file == NULL) {
        printf("Error: file do not exists\n");
        return 0;
    }
    printf("Finish reading\nParsing...\n");

    hvml_dom_t* hvml_dom = hvml_dom_load_from_stream(hvml_file);
    if(hvml_dom == NULL) {
        printf("Error: parse error\n");
        return 0;
    }
    printf("Finish parsing\n");

    hvml_dom_printf(hvml_dom, stdout);

    return 0;
}
